import { create } from 'zustand';
import { User } from '@/types/user';

const storedToken =
  typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

const rawUser =
  typeof window !== 'undefined' ? localStorage.getItem('user') : null;

const storedUser =
  rawUser && rawUser !== 'undefined' ? JSON.parse(rawUser) : null;

  interface AuthState {
    user: User | null;
    accessToken: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
  }
export interface AuthUser {
  id: number;
  email: string;
  user_type: ('seeker' | 'business' | 'admin')[];
  name: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser,
  accessToken: storedToken,
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
