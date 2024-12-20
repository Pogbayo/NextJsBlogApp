import { Post } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();

    const posts = await Post.find();

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch posts!" },
      { status: 500 }
    );
  }
};
