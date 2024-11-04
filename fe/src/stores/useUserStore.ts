import { create } from 'zustand';

type buddyData = { id: number; name: string; age: number; image: string };

type State = {
  buddyID: number;
  buddysData: buddyData[];
  hasMultiUser: boolean;
};
type Action = {
  changeBuddy: (newBuddy: State['buddyID']) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  buddyID: 0,
  buddysData: [{ id: 0, name: '', age: 0, image: '' }],
  hasMultiUser: false,
  changeBuddy: (newBuddy: number) => set({ buddyID: newBuddy }),
}));
