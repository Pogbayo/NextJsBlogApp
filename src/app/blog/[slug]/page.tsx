import PostUser from "@/components/postUser/postUser";
import styles from "./singlePost.module.css";
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { Params } from "@/lib/data";
import { PostsType } from "@/lib/data";
import { ObjectId } from "mongodb";

// FETCH DATA WITH AN API
// const getData = async (slug: string) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }
//   return res.json();
// };

type postType = {
  post: PostsType;
};

//FECTH DATA WITH AN API
//const post = await getData(slug);

const SinglePost = async ({ params }: Params) => {
  const { slug } = params;
  // const postId = parseInt(slug);
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }
  console.log(post);

  const userId = post.userId; // Ensure ObjectId is passed

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};
export default SinglePost;

import styles from "./singlePost.module.css";
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { Params } from "@/lib/data";
import { PostsType } from "@/lib/data";
import { ObjectId } from "mongodb";

// FETCH DATA WITH AN API
// const getData = async (slug: string) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }
//   return res.json();
// };

type postType = {
  post: PostsType;
};

//FECTH DATA WITH AN API
//const post = await getData(slug);

const SinglePost = async ({ params }: Params) => {
  const { slug } = params;
  // const postId = parseInt(slug);
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }
  console.log(post);

  const userId = post.userId; // Ensure ObjectId is passed

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};
export default SinglePost;
