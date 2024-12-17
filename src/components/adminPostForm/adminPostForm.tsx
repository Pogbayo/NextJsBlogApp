"use client";

import { addPost } from "@/lib/actions";
import styles from "./adminPostForm.module.css";
import { useState } from "react";

interface AdminPostFormProps {
  userId: string;
}

export const AdminPostForm = ({ userId }: AdminPostFormProps) => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    img: "",
    desc: "",
  });
  // State for handling submission and error
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setError(null);

    try {
      const form = new FormData();
      form.append("userId", userId);
      form.append("title", formData.title);
      form.append("slug", formData.slug);
      if (formData.img) form.append("img", formData.img); // Only append if image is provided
      form.append("desc", formData.desc);

      await addPost(form);
      // alert("Post added successfully!");
      setFormData({
        title: "",
        slug: "",
        img: "",
        desc: "",
      });
    } catch (err) {
      setError("Failed to add post. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={formData.slug}
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
      <textarea
        name="desc"
        placeholder="Description"
        rows={10}
        value={formData.desc}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
