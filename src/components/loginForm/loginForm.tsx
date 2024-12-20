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
  const { status } = useSession();

  // Function to refresh the session periodically
  const refreshSession = async () => {
    try {
      await signIn("credentials", { redirect: false });
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Set an interval to refresh the session every 60 seconds
  useEffect(() => {
    if (status === "authenticated") {
      const interval = setInterval(() => {
        refreshSession();
      }, 60 * 1000); // Refresh every 60 seconds

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the page from refreshing on form submission

    setMessage(null); // Reset any previous messages

    const formData = new FormData(event.currentTarget); // Capture form inputs
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    try {
      // Attempt to sign in with NextAuth credentials
      const result = await signIn("credentials", {
        userName,
        password,
        redirect: false, // Prevent automatic redirection
      });

      // Handle authentication errors
      if (result?.error) {
        setMessage({ type: "error", text: result.error });
        return;
      }

      // Authentication was successful
      setMessage({ type: "success", text: "Login successful!" });
      router.push("/"); // Redirect the user to the home page
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
