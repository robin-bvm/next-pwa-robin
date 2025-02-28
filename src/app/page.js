"use client";
import ImageComponent from "./components/ImageComponent";
import Input from "./components/common/Input";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../services/axios";
import { API_ROUTES } from "../lib/api.route";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreed: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /**
   * Handle input change event
   */
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handle form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(API_ROUTES.register, {
        email: formData.email,
        agreed: formData.agreed,
      });

      if (response.status === 200) {
        localStorage.setItem("email", formData.email);
        setMessage("Redirecting to verify email page...");
        setMessageType("success");
        setTimeout(() => router.push("/components/verify-email"), 3000);
      } else {
        setMessage("Failed to register. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center m-8">Chat with John</h1>
      <ImageComponent />
      <form
        className="flex flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleInputChange}
          label={"name"}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleInputChange}
          label={"email"}
        />
        <div className="flex gap-5 justify-between items-center">
          <Input
            type="checkbox"
            name="agreed"
            onChange={handleInputChange}
            placeholder={"I agree to the terms & conditions"}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`text-center ${
            messageType === "error" ? "text-red-400" : "text-black-300"
          } underline`}
        >
          {message}
        </p>
      )}
    </>
  );
}
