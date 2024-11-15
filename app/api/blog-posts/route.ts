// app/api/blog-posts/route.ts
import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    const { userId } = await await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
