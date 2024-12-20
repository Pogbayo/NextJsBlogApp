"use client";

import styles from "./loginform.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export const LoginForm = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();
  const { status } = useSession(); // Ensure you're accessing session data

  // Redirect authenticated users to the homepage if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to homepage after successful login
    }
  }, [status, router]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh on form submission
    setMessage(null); // Reset any previous messages

    const formData = new FormData(event.currentTarget); // Capture form inputs
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    try {
      // Attempt to sign in with NextAuth credentials
      const result = await signIn("credentials", {
        userName,
        password,
        redirect: false, // Prevent automatic redirection by NextAuth
      });

      // Handle authentication errors
      if (!result || result.error) {
        setMessage({
          type: "error",
          text: result?.error || "An unknown error occurred.",
        });
        return;
      }

      // Authentication was successful
      setMessage({ type: "success", text: "Login successful!" });

      // Trigger manual redirection after successful login
      router.push("/"); // Redirect to homepage
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
