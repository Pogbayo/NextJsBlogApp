"use client";
import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

type LinkType = {
  title: string;
  path: string;
};

interface NavLinkProps {
  item: LinkType;
  onClick?: () => void; // Optional onClick prop for custom functionality
}

const NavLink = ({ item, onClick }: NavLinkProps) => {
  const pathName = usePathname();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the onClick prop if it exists
    }
  };

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`}
      onClick={handleClick} // Trigger onClick when the link is clicked
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
