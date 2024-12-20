"use client";
import { LoginForm } from "@/components/loginForm/loginForm";
import { signIn } from "next-auth/react";
import styles from "./login.module.css";
const LoginPage = () => {
  const handleGithubLogin = () => {
    signIn("github"); // GitHub login using NextAuth
  };

  // Handle credentials login
  // const handleCredentialsLogin = async (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault(); // Prevent default form submission behavior

  //   const formData = new FormData(event.currentTarget); // Create FormData from the form
  //   const userName = formData.get("userName") as string;
  //   const password = formData.get("password") as string;

  //   const result = await signIn("credentials", {
  //     redirect: false, // Prevent redirection for handling errors on the same page
  //     userName,
  //     password,
  //   });

  //   if (result?.error) {
  //     alert(`Login failed: ${result.error}`); // Display error message to user
  //   } else {
  //     alert("Login successful!");
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
