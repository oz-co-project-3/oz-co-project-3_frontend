import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  reset: () => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  redirectPath: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setRedirectPath: (path) => set({ redirectPath: path }),
  reset: () => set({ isOpen: false, redirectPath: '' }),
}));
