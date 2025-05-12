import { create } from 'zustand';
import { User, UserProfileResponse } from '@/types/user';
import { fetchOnClient } from '@/api/clientFetcher';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isInitialized: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  restoreUser: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,

  login: (user, token) =>
    set({
      user,
      accessToken: token,
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isInitialized: true,
    }),

  setUser: (user: User) => set({ user }),

  setAccessToken: (token: string) => set({ accessToken: token }),

  restoreUser: async () => {
    try {
      const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!tokenRes.ok) throw new Error('refresh-token 요청 실패');

      const { access_token } = await tokenRes.json();
      if (!access_token) throw new Error('access_token 없음');

      const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user: User = {
        id: Number(data.base.id),
        email: data.base.email,
        name: data.seeker?.name ?? data.corp?.manager_name ?? '',
        user_type: data.base.user_type as 'normal' | 'business' | 'admin',
        signinMethod: data.base.signinMethod as 'email' | 'naver' | 'kakao',
      };

      set({
        user,
        accessToken: access_token,
        isInitialized: true,
      });

      console.log('✅ 사용자 상태 복원 완료:', user);
    } catch (err) {
      console.warn('⚠️ 사용자 상태 복원 실패:', err);
      set({
        user: null,
        accessToken: null,
        isInitialized: true,
      });
    }
  },

  refreshProfile: async () => {
    try {
      const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
        method: 'GET',
      });

      const user: User = {
        id: Number(data.base.id),
        email: data.base.email,
        name: data.seeker?.name ?? data.corp?.manager_name ?? '',
        user_type: data.base.user_type as 'normal' | 'business' | 'admin',
        signinMethod: data.base.signinMethod as 'email' | 'naver' | 'kakao',
      };

      set({ user });
      console.log('🔄 사용자 프로필 갱신:', user);
    } catch (err) {
      console.warn('⚠️ 사용자 프로필 갱신 실패:', err);
    }
  },
}));
