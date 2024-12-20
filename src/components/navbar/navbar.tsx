import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { getServerSession } from "next-auth/next";
import { config } from "@/app/api/auth/[...nextauth]/route";

export interface sessionType {
  user: {
    name: string | null; // Allow name to be string or null
    email: string;
    image: string | null; // Allow image to be null (in case it's not set)
    id: string; // You may want to keep id as a string
    isAdmin: boolean;
  } | null; // User can also be null if the user is not logged in
  expires: string;
}

const Navbar = async () => {
  const session = (await getServerSession(config)) as sessionType | null;

  // console.log(session);
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Spag
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
