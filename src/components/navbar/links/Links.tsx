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
  session: sessionType | null;
}

const Links = ({ session }: LinksProps) => {
  const { data: sessionData } = useSession();
  const [sessionState, setSessionState] = useState<sessionType | null>(session);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (sessionData) {
      setSessionState({
        user: sessionData.user
          ? {
              name: sessionData.user.name || null,
              email: sessionData.user.email || "",
              image: sessionData.user.image || null,
              id: sessionData.user.id || "",
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

  const closeMenu = () => {
    setOpen(false);
  };

  const links: LinkType[] = [
    { title: "HomePage", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Blog", path: "/blog" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} onClick={closeMenu} />
        ))}

        {sessionState?.user && sessionState.user.isAdmin && (
          <NavLink
            item={{ title: "Admin", path: "/admin" }}
            onClick={closeMenu}
          />
        )}

        {sessionState?.user ? (
          <form action={handleLogOut}>
            <button className={styles.logout}>Logout</button>
          </form>
        ) : (
          <NavLink
            item={{ title: "Login", path: "/login" }}
            onClick={closeMenu}
          />
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

      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} onClick={closeMenu} />
          ))}
          {sessionState?.user && sessionState.user.isAdmin && (
            <NavLink
              item={{ title: "Admin", path: "/admin" }}
              onClick={closeMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
