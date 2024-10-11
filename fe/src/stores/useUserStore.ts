import { create } from 'zustand';

type State = {
  buddyID: number;
  hasMultiUser: boolean;
};
type Action = {
  changeBuddy: (newBuddy: State['buddyID']) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  buddyID: 0,
  hasMultiUser: false,
  changeBuddy: (newBuddy: number) => set({ buddyID: newBuddy }),
}));
