import { Post } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // Ensure the database connection
    await connectToDb();

    // Fetch all posts from the database
    const posts = await Post.find();

    // Return the fetched posts as a JSON response
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    // Handle errors and return an error response
    return NextResponse.json(
      { message: "Failed to fetch posts!" },
      { status: 500 }
    );
  }
};
