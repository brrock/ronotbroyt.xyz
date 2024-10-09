import React from 'react';
import { Suspense } from 'react';
import prisma from '@/db/prisma';
import { Nav } from '@/components/nav';
import { PostContent } from '@/components/PostContent';
import { headers } from 'next/headers';
import { UserData, blogPost } from '@/shared/types';

async function fetchUserData(userId: string) {
  try {
    const headersList = headers();
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const host = headersList.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const response = await fetch(`${baseUrl}/api/userdata/${userId}`, { 
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

async function getPostData(id: string): Promise<{ post: blogPost; userData: UserData | null }> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    throw new Error('Post not found');
  }

  const postAuthor = await fetchUserData(post.userId);

  const formattedPost: blogPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };

  const userData: UserData | null = postAuthor ? {
    id: postAuthor.id,
    username: postAuthor.username,
    image_url: postAuthor.image_url,
    role: postAuthor.role,
  } : null;

  return { post: formattedPost, userData };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { post, userData } = await getPostData(params.id);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading post content...</div>}>
          <PostContent blog={post} userData={userData} />
        </Suspense>
      </main>
    </div>
  );
}