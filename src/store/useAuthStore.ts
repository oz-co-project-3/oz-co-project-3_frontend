// store/useAuthStore.ts
import { create } from 'zustand';
import { User } from '@/types/user';


interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  restoreUser: () => Promise<void>;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  login: (user, token) => set({ user, accessToken: token }),
  logout: () => set({ user: null, accessToken: null }),
  setAccessToken: (token) => set({ accessToken: token }),
  restoreUser: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/profile/`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('로그인 상태가 없습니다. 다시 로그인해주세요.');
      const data = await res.json();

      const user = {
        id: data.base.id,
        email: data.base.email,
        name: data.seeker.name,
        user_type: data.base.user_type,
        signinMethod: data.base.signinMethod,
      };

      set({ user, accessToken: data.access_token });
    } catch (err) {
      console.warn('로그인 복원 실패:', err);
      set({ user: null });
    }
  },
}));
