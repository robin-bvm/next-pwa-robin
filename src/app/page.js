"use client"
import Image from "./components/Image";
import Input from "./components/common/Input";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Page() {

  const [formData, setFormData] = useState({
    Name : "",
    Email : "",
    checked : false
  });
  let text;

  /**
   * Handle input change event
   * @param {event} e 
   */
  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission event
   * @param {event} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    text = "Redirection to verify email page.....";

    // setTimeout(() => {
    //   window.location.href = "/verify-email";
    // }, 3000);
  };


  return (
    <>
      <Navbar />

      <h1 className="text-center m-8">
        Chat with John
      </h1>

      <Image />

      <form className="flex justify-center items-center w-full gap-5 flex-col p-5" onSubmit={handleSubmit}>

        {/* Input for name */}

        <Input type="text" name={"Name"} placeholder="Enter name" onChange={handleInputChange} />

        {/* Input for email */}
        <Input type="email" name={"Email"} placeholder="Enter email" onChange={handleInputChange} />

        <div className="flex justify-between items-center gap-10 p-4">
          {/* Input for checkbox */}
          <Input type="checkbox" name={"checked"} placeholder="I agree the terms & conditions"  onChange={handleInputChange} />
          <button  type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" >
            Submit
          </button>
        </div>
      </form>
        {
          text && <>
          <p className="text-center text-blue-300">
            {text}
          </p>
          </>
        }
    </>
  );
}
