"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 shadow-md dark:bg-zinc-900 fixed z-100">
      <div className=" text-white dark:text-white hover:text-blue-300 max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="./Home"
          className="text-xl font-bold text-white dark:text-white"
        >
          Game Center
        </Link>

        <div className="text-white dark:text-white hover:text-blue-300 hidden md:flex space-x-6">
          <Link
            href="./Home"
            className="text-white dark:text-white hover:text-blue-300"
          >
            Find Games
          </Link>
          <Link
            href="./Create"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Create
          </Link>
          <Link
            href="/About"
            className="text-white dark:text-white hover:text-blue-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-white dark:text-white hover:text-blue-300"
          >
            Contact
          </Link>
          <Link
            href="./"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Log Out
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <Link
            href="./"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Find Games
          </Link>
          <Link
            href="./Create"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Create
          </Link>
          <Link
            href="./About"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            About
          </Link>
          <Link
            href="./statusReport"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Status Report
          </Link>
          <Link
            href="./contact"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Contact
          </Link>
          <Link
            href="./"
            className="block text-white dark:text-white hover:text-blue-300"
          >
            Log Out
          </Link>
        </div>
      )}
    </nav>
  );
}
