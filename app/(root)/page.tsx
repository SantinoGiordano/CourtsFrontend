"use client";

import { useEffect, useState } from "react";
import { GameItem } from "./types/type";

export default function Home() {
  const [item, setItem] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    fetch("http://localhost:8080/api/Games")
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false); // done loading
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setLoading(false); // stop loading on error too
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Games
      </h1>
  
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-indigo-600"></span>
        </div>
      ) : item.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No games scheduled.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {item.map((game) => (
            <div
              key={game._id}
              className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl border border-gray-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-indigo-600">Game Type:</h2>
                <span className="text-2xl text-gray-800">{game.name}</span>
              </div>
  
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Location:</span> {game.location}
              </p>
              <p
                className={`mb-1 ${
                  game.status ? "text-green-600" : "text-red-600"
                }`}
              >
                <span className="font-semibold">Status:</span>{" "}
                {game.status ? "Full" : "Need players"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Players Playing:</span> {game.playershave}
                <span className="font-semibold">Players Needed:</span> {game.playersneed}
              </p>
              {game.time && (
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-semibold">Time:</span>{" "}
                  {new Date(game.time).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
