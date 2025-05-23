"use client";

import SearchBar from "@/app/componets/searchbar";
import { GameItem } from "@/types/type";
import { useEffect, useState } from "react";


export default function Home() {
  const [items, setItems] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);



  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/Games");
        const data = await res.json();
        console.log("Fetched games:", data); // Add this to check fetched data

        // Ensure fetched data is an array
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching:", e.target.value); // Add this to track search value
    setSearchValue(e.target.value);
  };

  // Only filter if items is not empty and is an array
  const filteredGames = loading
    ? [] // Return an empty array if loading
    : Array.isArray(items)
    ? items.filter((game) =>
        game.type?.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Games
      </h1>

      <div className="max-w-md mx-auto mb-6">
        <label
          htmlFor="search"
          className="block mb-2 text-sm font-medium text-gray-700"
        ></label>
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
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition hover:shadow-2xl"
            >
              {/* Game Type - Blue Header */}
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Game Type: {game.type}</h2>
              </div>

              {/* Rest of the card - White */}
              <div className="p-6 space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Who&apos;s Posting:</span>{" "}
                  {game.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Location:</span>{" "}
                  {game.location}
                </p>
                <p
                  className={`${
                    game.status ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  <span>Status:</span> {game.status ? "Full" : "Need Players"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Players Playing:</span>{" "}
                  {game.playershave}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Players Needed:</span>{" "}
                  {game.playersneed}
                </p>
                {game.time && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Time:</span>{" "}
                    {new Date(game.time).toLocaleString()}
                  </p>
                )}
                <p
                  className="text-blue-600 text-sm cursor-pointer hover:underline"
                  onClick={() =>
                    setExpanded(expanded === game._id ? null : game._id)
                  }
                >
                  {expanded === game._id ? "Hide Description" : "Description"}
                </p>

                {expanded === game._id && (
                  <p className="text-gray-700 mt-2 border-t pt-2">
                    {game.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
