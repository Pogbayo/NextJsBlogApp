// import { Date } from "mongoose";
import { Post, User } from "./models";
import connectToDb from "./utils";
import { unstable_noStore as noStore} from "next/cache";
//TEMPORARY DATA
export type UserType = {
    // id:number,
    // name:string
    userId:string
}
export type PostsType = {
    createdAt:Date
    userId:string,
    title:string,
    desc:string,
    slug:string,
    img:string,
}
export type Params = {
    params: {
      slug: string;
    };
  };
export type PostData = {
    userId: number;
    id: number;
    title: string;
    body: string;
    img:string;
    slug:string;
    createdAt:string;
  };
    
export type UsersType = {
    userId: number;
  };

export const getPosts = async () => {
  try {
   await connectToDb()
     const posts = await Post.find()
     console.log(posts)
     return posts
} catch (error) {
  console.log(error)
   throw new Error('failed to fetch posts!')
}}



export const getPost = async (slug: string) => {
 
  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw new Error('Failed to fetch post!');
  }
}; 

export const getUser = async (id: string) => {
  console.log("Fetching post with id:", id); 
  noStore()
  try {
    await connectToDb();
    const user = await User.findById(id); 
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user!");
  }
};

// import mongoose from 'mongoose';

// export const getUser = async (id: string) => {
//   console.log("Fetching user with id:", id);

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     console.error("Invalid ObjectId:", id);
//     return null; // or throw an error
//   }

//   noStore();
//   try {
//     await connectToDb();
//     const user = await User.findById(id);
//     return user;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw new Error("Failed to fetch user!");
//   }
// };


export const getUsers = async () =>{
  try {
    await connectToDb()
     const users= await User.find()
     return users
} catch (err) {
  console.log(err)
   throw new Error('failed to fetch users!')
}}
