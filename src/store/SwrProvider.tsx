'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';
import { useAuthStore } from './useAuthStore';
import { UserProfileResponse } from '@/types/user';

export default function SwrProvider({ children }: { children: React.ReactNode }) {
  const login = useAuthStore((state) => state.login);
  const fetcher = async (url: string) => {
    const response = await fetchOnClient(url);
    return response;
  };

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const data = await fetchOnClient<UserProfileResponse>('/api/user/profile/');
        const tokens = await fetchOnClient<{ access_token: string }>('/api/user/refresh-token/');
        const { base } = data;
        const user = {
          id: base.id,
          email: base.email,
          name: data.seeker?.name ?? data.corp?.manager_name ?? '',
          user_type: base.user_type,
          signinMethod: base.signinMethod,
        };

        login(user, tokens.access_token);
        console.log('유저 상태 복원 완료:', user);
      } catch (error) {
        console.warn('유저 상태 복원 안됨:', error);
      }
    };

    restoreUser();
  }, [login]);

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
