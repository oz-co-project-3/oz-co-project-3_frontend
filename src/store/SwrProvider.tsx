'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import { SWRConfig } from 'swr';
import { useEffect, useRef } from 'react';
import { useAuthStore } from './useAuthStore';
import { UserProfileResponse } from '@/types/user';

export default function SwrProvider({ children }: { children: React.ReactNode }) {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const hasRestored = useRef(false);

  const fetcher = async (url: string) => {
    return await fetchOnClient(url);
  };

  useEffect(() => {
    if (hasRestored.current) return;

    const restoreUser = async () => {
      console.log('복원 시작');

      try {
        const hasRefreshToken = document.cookie.includes('refresh_token');
        console.log('🔍 쿠키에 refresh_token 있음?', hasRefreshToken);

        if (!hasRefreshToken) {
          console.warn('⚠️ 쿠키 없음 → 복원 스킵');
          return;
        }

        console.log('📡 refresh-token 요청 시도');
        const tokenRes = await fetch(
          `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`,
          {
            method: 'POST',
            credentials: 'include',
          },
        );

        if (!tokenRes.ok) {
          console.warn('refresh-token 응답 실패', tokenRes.status);
          logout();
          return;
        }

        const { access_token } = await tokenRes.json();
        if (!access_token) {
          console.warn('access_token 없음 in 응답');
          logout();
          return;
        }

        console.log('access_token 재발급 완료:', access_token);

        console.log('프로필 요청 시도');
        const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const { base } = data;
        const user = {
          id: base.id,
          email: base.email,
          name: data.seeker?.name ?? data.corp?.manager_name ?? '',
          user_type: base.user_type,
          signinMethod: base.signinMethod,
        };

        console.log('프로필 응답 성공:', user);

        login(user, access_token);
        hasRestored.current = true;
        console.log('유저 상태 복원 완료');
      } catch (error) {
        console.error('복원 중 에러 발생:', error);
        logout();
      }
    };

    restoreUser();
  }, [login, logout]);

  return (
    <SWRConfig
      value={{
        fetcher,
        errorRetryCount: 3,
        errorRetryInterval: 3000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
