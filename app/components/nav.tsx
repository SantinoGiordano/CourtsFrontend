"use client";

import Link from "next/link";
import { Menu, X, PlusCircle, Info, Mail, LogOut, BarChart, Home } from "lucide-react";
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
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Home className="w-4 h-4 mr-1" />
            Find Games
          </Link>
          <Link
            href="./Create"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Create
          </Link>
          <Link
            href="/About"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Info className="w-4 h-4 mr-1" />
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </Link>
          <Link
            href="./"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <LogOut className="w-4 h-4 mr-1" />
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
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Home className="w-4 h-4 mr-1" />
            Find Games
          </Link>
          <Link
            href="./Create"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Create
          </Link>
          <Link
            href="./About"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Info className="w-4 h-4 mr-1" />
            About
          </Link>
          <Link
            href="./statusReport"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <BarChart className="w-4 h-4 mr-1" />
            Status Report
          </Link>
          <Link
            href="./contact"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </Link>
          <Link
            href="./"
            className="flex items-center text-white dark:text-white hover:text-blue-300"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Log Out
          </Link>
        </div>
      )}
    </nav>
  );
}
