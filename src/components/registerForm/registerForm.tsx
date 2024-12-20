"use client";

import styles from "./registerform.module.css";
import { useState } from "react";
import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null); // Clear any previous errors
    setSuccessMessage(null); // Clear any previous success message

    const formData = new FormData(event.currentTarget);

    try {
      const result = await register(formData);

      if (result.error) {
        setErrorMessage(result.error); // Display server-side error
      } else {
        setSuccessMessage("User registered successfully!");

        // Redirect after success
        // console.log("Redirecting to /login"); // Debugging line
        setTimeout(() => {
          router.push("/login"); // Navigate to login page
        }, 2000); // 2-second delay for displaying success message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="userName" required />
      <input type="email" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
        required
      />
      <button type="submit">Register</button>

      {/* Error Message Display */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Success Message Display */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <Link href={"/login"}>
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};
