"use client";

import { useEffect, useState } from "react";
import { GameItem } from "./types/type";
import SearchBar from "../componets/searchbar";


export default function Home() {
  const [items, setItems] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/Games");
        const data = await res.json();
        console.log("Fetched games:", data); // Add this
        setItems(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGames();
  }, []);
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching:", e.target.value); // Add this
    setSearchValue(e.target.value);
  };
  

  const filteredGames = items.filter((game) =>
    game.type?.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Games
      </h1>

      <div className="max-w-md mx-auto mb-6">
        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
        </label>
        <SearchBar value={searchValue} onChange={handleSearchChange} />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-indigo-600"></span>
        </div>
      ) : filteredGames.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No games found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <div
              key={game._id}
              className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl border border-gray-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-black">Game Type:</h2>
                <span className="text-2xl text-gray-800">{game.type}</span>
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
                {game.status ? "Full" : "Need Players"}
              </p>
              <div className="text-gray-700 mb-1">
                <div className="font-semibold">
                  Players Playing: {game.playershave}
                </div>
                <div className="font-semibold">
                  Players Needed: {game.playersneed}
                </div>
              </div>
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
