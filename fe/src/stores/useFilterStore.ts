import dayjs from 'dayjs';
import { create } from 'zustand';

import { FilterType } from '@/types/walk';

interface FilterState {
  type: FilterType;
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setType: (type: FilterType) => void;
  setWeekly: () => void;
  setMonthly: () => void;
  setAll: (month: number, year: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  type: 'weekly',
  month: dayjs().month() + 1,
  year: dayjs().year(),
  setMonth: (month: number) => set({ month }),
  setYear: (year: number) => set({ year }),
  setType: (type: FilterType) => set({ type }),
  setWeekly: () => set({ type: 'weekly' }),
  setMonthly: () => set({ type: 'monthly' }),
  setAll: (month: number, year: number) => set({ type: 'all', month, year }),
}));
