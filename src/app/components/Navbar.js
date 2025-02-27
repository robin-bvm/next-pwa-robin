"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-gray-300 text-black p-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-lg font-semibold">Quantemplate</h1>

        {/* Hamburger Icon - Mobile */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 px-5">
          <li>
            <Link href={"/"}>Digital Clothing Service</Link>
          </li>
          <li>
            <Link href={"/components/verify-email"}>Digital Clones</Link>
          </li>
          <li>
            <Link href={"/components/chat-page"}>About</Link>
          </li>
          <li>
            <Link href={"/"}>Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute left-0 top-12 w-full bg-slate-100 flex flex-col gap-4 p-4 md:hidden">
          <li>
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              Digital Clothing Service
            </Link>
          </li>
          <li>
            <Link
              href={"/components/verify-email"}
              onClick={() => setIsOpen(false)}
            >
              Digital Clones
            </Link>
          </li>
          <li>
            <Link
              href={"/components/chat-page"}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
