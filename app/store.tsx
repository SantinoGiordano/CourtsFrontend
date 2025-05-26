import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  username: string;
  setUsername: (name: string) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    }),
    {
      name: "user-storage",
    }
  )
);
