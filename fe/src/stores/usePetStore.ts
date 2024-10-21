import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PetInfo = {
  userId: number;
  petId: number;
  petName: string;
  profileImage: string;
};

type PetState = {
  petsInfo: PetInfo[];
  selectedBuddy: PetInfo | null;
  setPetsInfo: (pets: PetInfo[]) => void;
  setSelectedBuddy: (buddy: PetInfo) => void;
};

export const usePetStore = create<PetState>()(
  persist(
    (set, get) => ({
      petsInfo: [],
      selectedBuddy: null,
      setPetsInfo: (pets) => {
        set({ petsInfo: pets });
        if (!get().selectedBuddy && pets.length > 0) {
          set({ selectedBuddy: pets[0] });
        }
      },
      setSelectedBuddy: (buddy) => set({ selectedBuddy: buddy }),
    }),
    {
      name: 'petsStorage',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
