import { create } from 'zustand';
import { User } from '@/types/user';

  interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    user: null,
  
    login: (user) => {
      set({ user });
    },
  
    logout: () => {
      set({ user: null });
    },
  
    setUser: (user) => {
      set({ user });
    },
  }));
  
