import { create } from 'zustand';

import { PetInfo } from '@/types/pet';

type PetState = {
  petsInfo: PetInfo[];
  setPetsInfo: (pets: PetInfo[]) => void;
};

export const usePetStore = create<PetState>((set) => ({
  petsInfo: [],
  setPetsInfo: (pets) => set({ petsInfo: pets }),
}));
