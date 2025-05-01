"use client";
import React, { useState } from "react";
import { GameItem } from "../types/type";

const CreateGame: React.FC = () => {
  const [form, setForm] = useState<Omit<GameItem, "_id">>({
    status: false,
    playersneed: 0,
    playershave: 0,
    time: undefined,
    location: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const parsedValue =
      type === "checkbox"
        ? checked
        : name === "playershave" || name === "playersneed" || name === "price"
        ? Number(value)
        : value;

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
      const response = await fetch("http://localhost:8080/api/makegames", {
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
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Game</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        Game Type:
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
        Where:
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />
        Player you have:
        <input
          type="number"
          name="playershave"
          value={form.playershave}
          onChange={handleChange}
          placeholder="How many players do you have"
          className="input input-bordered w-full"
          min={0}
        />
        Players Needed:
        <input
          type="number"
          name="playersneed"
          value={form.playersneed}
          onChange={handleChange}
          placeholder="How many players do you need"
          className="input input-bordered w-full"
          min={0}
        />
        When:
        <input
          type="datetime-local"
          name="time"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, time: new Date(e.target.value) }))
          }
          className="input input-bordered w-full"
        />
        <label className="flex items-center space-x-2">
        <span>Check box if game no spots are avalible</span>
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
        </label>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Game"}
        </button>
        {success && (
          <p className="text-green-600 text-sm text-center mt-2">
            Game created successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateGame;
