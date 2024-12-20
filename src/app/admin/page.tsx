import { Suspense } from "react";
import styles from "./admin.module.css";
import { AdminPosts } from "@/components/adminPosts copy/adminPosts";
import { AdminPostForm } from "@/components/adminPostForm/adminPostForm";
import { AdminUsers } from "@/components/adminUsers/adminUsers";
import { AdminUserForm } from "@/components/adminUserForm/adminUserForm";
import { getServerSession } from "next-auth";
import { config } from "../api/auth/[...nextauth]/route";
// import { config } from "@/lib/auth.config";

const AdminPage = async () => {
  const session = await getServerSession(config);

  if (!session) {
    return <div>You are not authenticated.</div>;
  }

  // console.log("Session:", session);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId={session?.user?.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
