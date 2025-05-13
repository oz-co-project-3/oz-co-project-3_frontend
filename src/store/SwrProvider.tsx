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
      try {
        // ✅ 쿠키에 refresh_token 있을 때만 실행
        const hasRefreshToken = document.cookie.includes('refresh_token');
        if (!hasRefreshToken) {
          return;
        }
  
        const tokenRes = await fetch(
          `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`,
          {
            method: 'POST',
            credentials: 'include',
          },
        );
  
        if (!tokenRes.ok) {
          console.warn('access_token 재발급 실패 (401)');
          logout();
          return;
        }
  
        const { access_token } = await tokenRes.json();
        if (!access_token) {
          console.warn('access_token 없음');
          logout();
          return;
        }
  
        const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/');
        const { base } = data;
  
        const user = {
          id: base.id,
          email: base.email,
          name: data.seeker?.name ?? data.corp?.manager_name ?? '',
          user_type: base.user_type,
          signinMethod: base.signinMethod,
        };
  
        login(user, access_token);
        console.log('✅ 유저 상태 복원 완료:', user);
        hasRestored.current = true;
      } catch (error) {
        console.warn('⛔ 유저 상태 복원 실패:', error);
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

// 차후에 필요한 옵션 추가