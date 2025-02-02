import Image from "next/image";
import styles from "./postUser.module.css";
import { getUser, UserType } from "@/lib/data";

const PostUser = async ({ userId }: UserType) => {
  const user = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span> {user.userId}</span>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.userName}</span>
      </div>
    </div>
  );
};
export default PostUser;
