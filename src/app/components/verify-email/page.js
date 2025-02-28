"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageComponent from "../ImageComponent";
import Navbar from "../Navbar";
import Input from "../common/Input";
import { axiosInstance } from "@/services/axios";
import { API_ROUTES } from "@/lib/api.route";

export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /**
   * Handle OTP input change
   */
  const handleInputChange = (e, index) => {
    const value = e.target.value.slice(-1); // Ensure single digit
    setOtp((prev) => {
      const otpArray = prev.split("");
      otpArray[index] = value;
      return otpArray.join("");
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setMessage("Please fill OTP");
      setMessageType("error");
      return;
    }

    try {
      const response = await axiosInstance.post(API_ROUTES.verify, {
        code: otp,
      });

      if (response.status === 200) {
        setMessage("Redirecting to chat page...");
        setMessageType("success");
        setTimeout(() => router.push("/components/chat-page"), 3000);
      } else {
        setMessage("Invalid OTP");
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
        <div className="flex gap-3">
          {[...Array(4)].map((_, index) => (
            <Input
              key={index}
              type="number"
              placeholder="0"
              onChange={(e) => handleInputChange(e, index)}
              className="w-10 text-center border rounded-md"
              min={0}
              max={9}
              onInput={(e) => {
                if (e.target.value <= 0) e.target.value = 0; // Enforce min value
                if (e.target.value >= 9) e.target.value = 9; // Enforce max value
              }}
            />
          ))}
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <p className="text-xs text-center">
          If you don&apos;t receive the code within 2 minutes, resend code.
        </p>
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
