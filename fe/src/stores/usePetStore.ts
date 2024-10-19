import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PetInfo = {
  userId: number;
  petId: number;
  petName: string;
  profileImage: string;
};

type PetState = {
  petsInfo: PetInfo[];
  setPetsInfo: (pets: PetInfo[]) => void;
};

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      petsInfo: [],
      setPetsInfo: (pets) => set({ petsInfo: pets }),
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
