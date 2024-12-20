"use client";

import { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { sessionType } from "../navbar";
import { signOut, useSession } from "next-auth/react";

interface LinkType {
  title: string;
  path: string;
}

interface LinksProps {
  session: sessionType | null; // Allow session to be null
}

const Links = ({ session }: LinksProps) => {
  const { data: sessionData } = useSession();
  const [sessionState, setSessionState] = useState<sessionType | null>(session);

  useEffect(() => {
    if (sessionData) {
      // Ensure sessionData is properly assigned to sessionState
      setSessionState({
        user: sessionData.user
          ? {
              name: sessionData.user.name || null, // Handle undefined or null name
              email: sessionData.user.email || "",
              image: sessionData.user.image || null, // Handle undefined or null image
              id: sessionData.user.id || "", // Handle undefined or null id
              isAdmin: sessionData.user.isAdmin || false,
            }
          : null,
        expires: sessionData.expires,
      });
    }
  }, [sessionData]);

  const handleLogOut = () => {
    signOut();
  };

  const links: LinkType[] = [
    { title: "HomePage", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Blog", path: "/blog" },
  ];

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {/* Show Admin link only if the user is authenticated and an admin */}
        {sessionState?.user && sessionState.user.isAdmin && (
          <NavLink item={{ title: "Admin", path: "/admin" }} />
        )}

        {sessionState?.user ? (
          <form action={handleLogOut}>
            <button className={styles.logout}>Logout</button>
          </form>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt="Menu"
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Mobile links */}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}

          {/* Show Admin link in mobile view only if the user is an admin */}
          {sessionState?.user && sessionState.user.isAdmin && (
            <NavLink item={{ title: "Admin", path: "/admin" }} />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
