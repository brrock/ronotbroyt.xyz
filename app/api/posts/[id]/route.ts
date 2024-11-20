import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = params.id;

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await prisma.forumPost.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (user.role !== "ADMIN" && post.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the post (this will also delete associated comments due to cascading delete)
    await prisma.forumPost.delete({ where: { id: postId } });

    return NextResponse.json(
      { message: "Post and associated comments deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Unable to delete post due to existing relationships. Please try again or contact support.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
