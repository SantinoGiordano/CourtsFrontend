"use client";

import SearchBar from "@/app/components/searchbar";
import { useUserStore } from "@/app/store";
import { GameItem } from "@/types/type";
import { useEffect, useState } from "react";
import Map from "@/app/components/map";
import React from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { API_COURTS_BACKEND } from "@/utils/env";

export default function Home() {
  const [items, setItems] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const username = useUserStore((state) => state.username);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_COURTS_BACKEND}/api/Games`);
        const data = await res.json();
        console.log("Fetched games:", data);

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
  const filteredGames = loading
    ? []
    : Array.isArray(items)
      ? items
          .slice()
          .reverse()
          .filter((game) =>
            game.type?.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
      : [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
        <h1 className="text-3xl font-bold text-center mt-5">
          Welcome {username || ""}
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
            {filteredGames.map((game) => {
              console.log("Game:", game); // <-- Add this line
              return (
                <div
                  key={game._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition hover:shadow-2xl"
                >
                  {/* Game Type - Blue Header */}
                  <div className="bg-blue-600 text-white px-6 py-4">
                    <h2 className="text-xl font-bold">
                      Game Type: {game.type}
                    </h2>
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
                    {Number(game.lat) && Number(game.lng) ? (
                      <Map lat={Number(game.lat)} lng={Number(game.lng)} />
                    ) : (
                      <div className="text-sm text-gray-400">
                        No map location available
                      </div>
                    )}
                    <p
                      className={`${
                        game.playersneed === 0 ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      <span>Status:</span>{" "}
                      {game.playersneed === 0 ? "Full" : "Need Players"}
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `${API_COURTS_BACKEND}/api/Games/join/${game._id}`,
                            {
                              method: "POST", // Use POST if your backend expects POST, or PATCH if it expects PATCH
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ username }),
                            }
                          );

                          const data = await res.json();
                          if (!res.ok) {
                            // Show backend error (e.g., "You have already joined this game.")
                            alert(data.error || "Failed to join");
                            return;
                          }

                          // Optionally, refetch games from backend here for full sync
                          setItems((prevItems) =>
                            prevItems.map((g) =>
                              g._id === game._id
                                ? {
                                    ...g,
                                    playershave: g.playershave + 1,
                                    playersneed: g.playersneed - 1,
                                    joinedUsers: [
                                      ...(g.joinedUsers || []),
                                      username,
                                    ], // update joinedUsers in UI
                                  }
                                : g
                            )
                          );
                          alert("Joined game successfully!");
                        } catch (err) {
                          console.error("Join failed:", err);
                          alert("Could not join this game.");
                        }
                      }}
                      disabled={
                        game.playersneed <= 0 ||
                        (game.joinedUsers &&
                          game.joinedUsers.includes(username))
                      }
                      className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {game.playersneed <= 0
                        ? "Game Full"
                        : game.joinedUsers &&
                            game.joinedUsers.includes(username)
                          ? "Already Joined"
                          : "Join Game"}
                    </button>
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

                    {/* Description Toggle */}
                    <div className="my-3">
                      <button
                        className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                        onClick={() =>
                          setExpanded(expanded === game._id ? null : game._id)
                        }
                      >
                        <Info className="w-4 h-4" />
                        {expanded === game._id
                          ? "Hide Description"
                          : "Show Description"}
                        {expanded === game._id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Animated Description */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expanded === game._id
                          ? "max-h-40 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {expanded === game._id && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-gray-700 shadow-inner">
                          <span className="font-semibold block mb-1">
                            Description:
                          </span>
                          {game.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
