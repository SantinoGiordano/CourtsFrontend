"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store"; 
import AccountToast from "@/app/components/AccountToast";
import { API_COURTS_BACKEND } from "@/utils/env";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsernameInput] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUsername = useUserStore((state) => state.setUsername); 
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await fetch(`${API_COURTS_BACKEND}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUsername(data.username);
        localStorage.setItem("username", data.username);
        setShowToast(true);
        setEmail("");
        setUsernameInput("");
        setPassword("");
      } else {
        setError(data.error || "Sign up failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)} 
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
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
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm mr-2"></span>
          ) : null}
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-5 w-full bg-white hover:bg-gray-300 transition-colors px-4 py-2 rounded text-black"
        >
          Back to Sign In
        </button>
      </form>
      {showToast && <AccountToast />}
    </div>
  );
}
