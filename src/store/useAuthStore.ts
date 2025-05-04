import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  // 액세스 토큰 추가 (기태)
  accessToken: string | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

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
