"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "../Image";
import Navbar from "../Navbar";
import Input from "../common/Input";


export default function Page() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    Name : "",
    Email : "",
    checked : false
  });
  const [text,setText] = useState("");

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

   setText("Redirection to verify email page.....");

    setTimeout(() => {
       router.push('/verify-email');
    }, 3000);

  };


  return (
    <>
      <Navbar />

      <h1 className="text-center m-8">
        Chat with John
      </h1>

      <Image />

      <form className="flex justify-center items-center w-full gap-5 flex-col p-5" onSubmit={handleSubmit}>

        <div className="flex justify-between items-center gap-5 pt-4">
          {/* Input for checkbox */}
          
        <Input type="text"  placeholder="0" onChange={handleInputChange} className="w-8 text-center" />
        <Input type="text"  placeholder="0" onChange={handleInputChange} className="w-8 text-center" />
        <Input type="text"  placeholder="0" onChange={handleInputChange} className="w-8 text-center" />
        <Input type="text"  placeholder="0" onChange={handleInputChange} className="w-8 text-center" />
         
          <button  type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" >
            Submit
          </button>
        </div>
        <p className="text-center text-xs">
          If you don't received code within 2 minutes, resend code
        </p>
      </form>
        {
          text && <>
          <p className="text-center text-black-300 underline">
            {text}
          </p>
          </> 
        }
    </>
  );
}
