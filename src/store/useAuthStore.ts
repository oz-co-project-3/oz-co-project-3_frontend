import { create } from 'zustand';
import { LoginResponseData } from '@/types/user'

interface AuthState {
  user: LoginResponseData['user'] | null; 
  accessToken: string | null;
  login: (user: LoginResponseData['user'], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  login: (user, token) => {
    set({ user, accessToken: token });
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, accessToken: null });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
}));