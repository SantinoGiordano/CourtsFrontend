"use client";
import { GameItem } from "@/types/type";
import React, { useEffect, useRef, useState } from "react";
import Map from "@/app/componets/map";
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
    lat: undefined,
    lng: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const autocompleteInstance = useRef<google.maps.places.Autocomplete | null>(null);

useEffect(() => {
  let autocomplete: google.maps.places.Autocomplete | null = null;
  const scriptLoaded = typeof window !== "undefined" && !!window.google;

  const initAutocomplete = () => {
    if (!autocompleteRef.current || !window.google?.maps?.places) return;
    autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete!.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setForm((prev) => ({
          ...prev,
          location: place.formatted_address || "",
          lat,
          lng,
        }));
      }
    });
    autocompleteInstance.current = autocomplete;
  };

  if (scriptLoaded) {
    initAutocomplete();
  } else {
    // Only add the script if it hasn't been added yet
    const existingScript = document.getElementById("__googleMapsScriptId");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "__googleMapsScriptId";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", initAutocomplete);
    }
  }

  // Cleanup
  return () => {
    if (autocomplete) {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    }
  };
}, []);
  
  const geocodeLocation = async (location: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.warn("Geocoding failed:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const handleLocationChange = async (value: string) => {
    setForm((prev) => ({
      ...prev,
      location: value,
    }));

    if (value.trim().length === 0) return;

    const coords = await geocodeLocation(value);
    if (coords) {
      setForm((prev) => ({
        ...prev,
        lat: coords.lat,
        lng: coords.lng,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name, value } = target;

    let parsedValue: string | number | boolean;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      parsedValue = target.checked;
    } else if (
      name === "playershave" ||
      name === "playersneed" ||
      name === "price"
    ) {
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
        name: "",
        description: "",
        lat: undefined,
        lng: undefined,
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
              <option value="Just Shooting">Just shooting</option>
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
              ref={autocompleteRef}
              value={form.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Where is the game?"
              className="input input-bordered w-full"
              autoComplete="off"
            />
            {form.lat && form.lng && (
              <div className="mt-4">
                <Map lat={form.lat} lng={form.lng} />
              </div>
            )}
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
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
              Add Description (optional)
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a description"
              className="textarea textarea-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
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
