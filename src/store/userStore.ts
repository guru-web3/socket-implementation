import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  address: string;
  setAddress: (address: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      address: "",
      setAddress: (address) => set({ address: address }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true,
    },
  ),
);

export default useUserStore;
