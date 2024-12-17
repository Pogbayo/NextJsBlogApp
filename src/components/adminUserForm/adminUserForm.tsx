"use client";

import { addUser } from "@/lib/actions";
import styles from "./adminUserForm.module.css";
import { useState } from "react";

export const AdminUserForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    img: "",
    isAdmin: "false", // Default value for isAdmin
  });

  // State for submission status and error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error on new submission

    try {
      // Convert formData object to FormData
      const form = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          form.append(key, formData[key as keyof typeof formData]);
        }
      }

      // Call the addUser function with the FormData object
      await addUser(form);
      setFormData({
        userName: "",
        email: "",
        password: "",
        img: "",
        isAdmin: "false", // Reset to default value after submission
      });
    } catch (err) {
      setError("Failed to add user. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Add New User</h1>
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="img"
        placeholder="Image URL"
        value={formData.img}
        onChange={handleChange}
      />
      <select name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default AdminUserForm;
