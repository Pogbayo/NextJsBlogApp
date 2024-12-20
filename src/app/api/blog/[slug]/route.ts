
import { Params } from "@/lib/data";
import { Post } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Correct typing for 
export const GET = async (request: NextRequest, { params }: Params) => {
    const { slug } = params;

    try {
        await connectToDb();

        const post = await Post.findOne({ slug });
        return NextResponse.json(post);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
    const { slug } = params;

    try {
        await connectToDb();

        await Post.deleteOne({ slug });
        return NextResponse.json("Post deleted");
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete post!");
    }
};
