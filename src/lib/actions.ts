"use server";
import connectToDb from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
// import {  signOut } from "next-auth/react";
import bcrypt from "bcryptjs"

export const addPost = async (formData: FormData): Promise<void> => {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const slug = formData.get("slug") as string;
  const userId = formData.get("userId") as string;
  try {
    await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
       revalidatePath("/blog")
       revalidatePath("/admin")
    console.log("New Post Created:", { title, desc, slug, userId });
  } catch (err) {
    console.error("Error adding post:", err);
  }
};
export const addUser = async (formData: FormData): Promise<void> => {
  const userName = formData.get("userName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const img = formData.get("img") as string;
  try {
    await connectToDb();
    const newUser = new User({
      userName,
      email,
      password,
      img,
    });
    await newUser.save();
       revalidatePath("/admin")
    console.log("New Post Created:", { userName, email, password, img });
  } catch (err) {
    console.error("Error adding post:", err);
  }
};

export const deletePost = async (formData:FormData): Promise<void> => {
const { id } = Object.fromEntries(formData) as { id: string };
    try {
      connectToDb();
      await Post.deleteMany({userId:id})
      await Post.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/blog");
      revalidatePath("/admin");
      
    } catch (err) {
        console.error("Error deleting post:", err);
        throw new Error("Something went wrong!");
    }
  };


export const deleteUser = async (formData:FormData): Promise<void> => {
    const { id } = Object.fromEntries(formData) as {id:string};
    try {
      connectToDb();
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
        console.error("Error deleting user:", err);
        throw new Error("Something went wrong!");
    }
  };

 
export const register = async (formData: FormData) => {
  // Ensure all formData entries are correctly typed as strings
  const userName = formData.get("userName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const img = formData.get("img") as string | undefined; // Optional field
  const passwordRepeat = formData.get("passwordRepeat") as string;

  // Validate required fields
  if (!userName || !email || !password || !passwordRepeat) {
    return { error: "All fields are required." };
  }

  // Validate password match
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match." };
  }

  try {
    await connectToDb();
    const user = await User.findOne({ userName });
    if (user) {
      return { error: "Username already exists." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      img,
    });

    // Save the user to the database
    await newUser.save();
    console.log("User saved to the database.");
    return { success: true };
  } catch (err) {
    console.error("Error registering user:", err);

    return { error: "Something went wrong during registration." };
  }
};



