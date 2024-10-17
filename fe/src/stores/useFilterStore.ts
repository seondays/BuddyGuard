import dayjs from 'dayjs';
import { create } from 'zustand';

import { FilterType } from '@/types/walk';

interface FilterState {
  type: FilterType;
  month: number;
  setType: (type: FilterType) => void;
  setWeekly: () => void;
  setMonthly: () => void;
  setAll: (month: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  type: 'weekly',
  month: dayjs().month() + 1,
  setType: (type: FilterType) => set({ type }),
  setWeekly: () => set({ type: 'weekly' }),
  setMonthly: () => set({ type: 'monthly' }),
  setAll: (month: number) => set({ type: 'all', month }),
}));
