"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import ImageComponent from "../ImageComponent";
import Input from "../common/Input";
import { API_ROUTES } from "@/lib/api.route";
import { axiosInstance } from "@/services/axios";

const Page = () => {
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [promptList, setPromptList] = useState([]);

  /**
   * Handle input change event
   * @param {event} e
   */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission event
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(API_ROUTES.chat, {
        messages: [...formData.prompt],
      });
      console.log("🚀 ~ :35 ~ handleSubmit ~ response:", response);

      if (response.status === 200) {
        if (formData.prompt != "")
          setPromptList([...promptList, response?.data?.reply]);
      } else {
        setText({
          type: "error",
          message: "Failed to chat section. Please try again.",
        });
      }
    } catch (error) {
      console.error("error:", error);
    }

    setFormData({ prompt: "" });
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center m-8">Chat with John</h1>

      <ImageComponent />

      {promptList?.length ? (
        <section className="overflow-y-scroll gap-10 h-[48vh] m-5 scroll-smooth">
          {promptList?.map((prompt, index) => (
            <>
              <div key={index}>
                <div className="float-right w-2/4 m-2 flex justify-end items-center">
                  <p className="text-justify bg-gray-100 rounded-xl border border-gray-200 h-fit w-fit p-4">
                    {prompt}
                  </p>
                </div>

                <div className="w-2/4 m-2 flex justify-start items-center">
                  <p className="text-justify bg-gray-100 rounded-xl border border-gray-200 h-fit w-fit p-4">
                    {prompt}
                  </p>
                </div>
              </div>
            </>
          ))}
        </section>
      ) : null}

      <form
        className="bottom-0 fixed bg-white border-gray-300 flex justify-center items-center w-full flex-col md:flex-row sm:flex-col"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name={"prompt"}
          className="w-[80vw] border border-gray-400 m-5 rounded-2xl p-5"
          placeholder={"Enter prompt here..."}
          value={formData.prompt}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Page;
