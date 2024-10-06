import { Nav } from '@/components/nav'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import prisma from '@/db/prisma'
import { Clock, Plus, User } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns';
import { Footer } from '@/components/footer'

interface ForumPost {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}
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
const PostCard: React.FC<{ post: ForumPost }> = async ({ post }) => {
  const userData = await fetchUserData(post.userId);

  return (
   <Link href={`/forum/post/${post.id}`}>
   <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-start">
        <h2 className="text-2xl font-bold text-center">{post.title}</h2>
      </CardHeader>
      <CardContent>
      <div className='text-center' dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </CardContent>
      <CardFooter className="flex justify-end items-center space-x-2">
      <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
        <span className="text-sm text-gray-500 text-right">By {userData.username || 'Unknown User'}</span>
        <Avatar>
          <AvatarImage src={userData.image_url || undefined} alt={userData.username || 'Unknown User'} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
   </Link>
  );
};

const Page = async () => {
  const posts = await prisma.forumPost.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  }) as ForumPost[];

  return (
    <><div>
      <Nav />
      <div className="flex flex-col items-center space-y-4">
        <h1 className='text-center py-4 text-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-wrap'>
          RoNotBroYT forums
        </h1>
        <Button asChild>
          <Link href="forum/create/"><Plus /> Create new post</Link>
        </Button>
        <ul className='grid grid-cols-3 gap-4 opacity-70'>
          {posts.map(post => (
            <li key={post.id}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <PostCard post={post} />
              </React.Suspense>
            </li>
          ))}
        </ul>
      </div>
    </div><Footer /></>
  );
};

export default Page;