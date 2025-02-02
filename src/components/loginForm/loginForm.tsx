"use client";

import styles from "./loginform.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";

export const LoginForm = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();
  // const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);
  useEffect(() => {
    // Check for an active session
    getSession().then((session) => {
      if (session) {
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setMessage({
          type: "error",
          text: result?.error || "An unknown error occurred.",
        });
        return;
      }

      setMessage({ type: "success", text: "Login successful!" });

      router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" name="userName" required />
      <input type="password" placeholder="Password" name="password" required />

      <button type="submit">Login</button>

      {/* Display error or success messages */}
      {message && (
        <p className={message.type === "error" ? styles.error : styles.success}>
          {message.text}
        </p>
      )}

      <Link href="/register">
        {"Don't have an account? "}
        <b>Register</b>
      </Link>
    </form>
  );
};
