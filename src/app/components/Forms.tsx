import React, { useState, FormEvent } from "react";
import styles from "./Forms.module.css";
import * as Yup from "yup"; // Import Yup

interface FormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormsProps {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters long."),
  email: Yup.string()
    .required("Email is required.")
    .email("Email is invalid."),
  topic: Yup.string().required("Topic is required."),
  message: Yup.string()
    .required("Message is required.")
    .min(10, "Message must be at least 10 characters long."),
});

const Forms: React.FC<FormsProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    topic: initialData?.topic || "",
    message: initialData?.message || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Validate the form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Send data if validation passes
      const response = await fetch("http://localhost:3001/postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Pass formData
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Message sent successfully:", responseData);
        onSubmit(formData); // Pass validated formData to onSubmit
      }
    } catch (err: any) {
      // If validation fails, update errors state
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.m4}>
        <label htmlFor="topic">Topic</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
        />
        {errors.topic && <span className={styles.error}>{errors.topic}</span>}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>
      <div>
        <button type="submit">Send besked</button>
      </div>
    </form>
  );
};

export default Forms;