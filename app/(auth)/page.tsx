"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "../store";
import { API_COURTS_BACKEND } from "@/utils/env";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUsername = useUserStore((state) => state.setUsername);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_COURTS_BACKEND}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUsername(data.username); // ✅ Set in Zustand
        localStorage.setItem("username", data.username); // Optional
        router.push("/Home");
      } else {
        setError(data.error || "Sign in failed.");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("An error occurred during sign in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded"
        >
          Sign In
        </button>

        <button
          onClick={() => router.push("/signup")}
          type="button"
          className="mt-5 w-full bg-white hover:bg-gray-300 transition-colors px-4 py-2 rounded text-black"
        >
          Create an Account
        </button>
      </form>
    </div>
  );
}
