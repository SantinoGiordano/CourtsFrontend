"use client";
import React, { useState } from "react";
import { GameItem } from "../../../types/type";
import { APICOURT_URI } from "@/utils/env";

const CreateGame: React.FC = () => {
  const [form, setForm] = useState<Omit<GameItem, "_id">>({
    status: false,
    playersneed: 0,
    playershave: 0,
    time: undefined,
    location: "",
    type: "",
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name, value } = target;
  
    let parsedValue: string | number | boolean;
  
    // Handle checkboxes safely
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      parsedValue = target.checked;
    } else if (name === "playershave" || name === "playersneed" || name === "price") {
      parsedValue = Number(value);
    } else {
      parsedValue = value;
    }
  
    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(`${APICOURT_URI}/api/makegames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create game");
      }

      setSuccess(true);
      setForm({
        status: false,
        playershave: 0,
        playersneed: 0,
        time: undefined,
        location: "",
        type: "",
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Create a New Game
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select Game Type
              </option>
              <option value="5 vs 5">5 vs 5</option>
              <option value="4 vs 4">4 vs 4</option>
              <option value="3 vs 3">3 vs 3</option>
              <option value="21">21</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Where is the game?"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Players You Have
            </label>
            <input
              type="number"
              name="playershave"
              value={form.playershave}
              onChange={handleChange}
              className="input input-bordered w-full"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Players Needed
            </label>
            <input
              type="number"
              name="playersneed"
              value={form.playersneed}
              onChange={handleChange}
              className="input input-bordered w-full"
              min={0}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="time"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  time: new Date(e.target.value),
                }))
              }
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Who's posting?"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a description"
              className="textarea textarea-bordered w-full"
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            className="checkbox"
          />
          <label className="text-sm text-gray-600">
            Check if there are no available spots
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full text-white ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Game"}
        </button>

        {success && (
          <p className="text-center text-green-600 font-medium">
            Game created successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateGame;
