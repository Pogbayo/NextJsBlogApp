"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NavigationTestPage = () => {
  const router = useRouter();
  // const pathName = usePathname();
  // console.log(pathName);
  const handleClick = () => {
    // console.log("clicked");
    router.push("/");
  };
  return (
    <div>
      <Link href="/" prefetch={false}>
        Click Here
      </Link>
      <button onClick={handleClick}>Write and redirect</button>
    </div>
  );
};
export default NavigationTestPage;
