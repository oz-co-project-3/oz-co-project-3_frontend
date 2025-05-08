// store/useAuthStore.ts
import { create } from 'zustand';
import { User } from '@/types/user';
import { fetchOnClient } from '@/api/clientFetcher';
import { UserProfileResponse } from '@/types/user';

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
      const tokenRes = await fetch(
        `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (!tokenRes.ok) throw new Error('refresh-token 요청 실패');

      const { access_token } = await tokenRes.json();
      if (!access_token) throw new Error('access_token 없음');

      const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
        method: 'GET',
      });

      const { base } = data;

      const user: User = {
        id: base.id,
        email: base.email,
        name: data.seeker?.name ?? data.corp?.manager_name ?? '',
        user_type: base.user_type,
        signinMethod: base.signinMethod,
      };

      set({ user, accessToken: access_token });
      console.log('복원 완료:', user);
    } catch (err) {
      console.warn('복원 실패:', err);
      set({ user: null, accessToken: null });
    }
  },
}));
