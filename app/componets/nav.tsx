// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md dark:bg-zinc-900 fixed z-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="./" className="text-xl font-bold text-zinc-800 dark:text-white">
          Courts
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="./Home" className="text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Find Games</Link>
          <Link href="./Create" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Create</Link>
          <Link href="/About" className="text-zinc-600 dark:text-zinc-200 hover:text-blue-500">About</Link>
          <Link href="./statusReport" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Status Report</Link>
          <Link href="/contact" className="text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Contact</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <Link href="./" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Find Games</Link>
          <Link href="./Create" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Create</Link>
          <Link href="./About" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">About</Link>
          <Link href="./statusReport" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Status Report</Link>
          <Link href="./contact" className="block text-zinc-600 dark:text-zinc-200 hover:text-blue-500">Contact</Link>
        </div>
      )}
    </nav>
  );
}

