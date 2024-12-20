import PostCard from "@/components/postCard/postCard";
import styles from "./blogs.module.css";
import { getPosts } from "@/lib/data";
import { PostData } from "@/lib/data";

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/blog", {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }
//   return res.json();
// };

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const posts: PostData[] = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post, index) => {
        return (
          <div className={styles.post} key={index}>
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default BlogPage;
