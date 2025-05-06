'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getTokenExpiry } from '@/lib/token';
import { fetchOnClient } from '@/api/clientFetcher';

interface TokenRefreshResponse {
  access_token: string;
}

export default function AutoTokenRefresher() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    if (!accessToken) return;

    const expiryTime = getTokenExpiry(accessToken);
    if (!expiryTime) return;

    const now = Date.now();
    const msUntilExpiry = expiryTime - now;
    const buffer = 60 * 1000; // 1분 전

    if (msUntilExpiry <= buffer) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetchOnClient<TokenRefreshResponse>('/api/user/refresh-token/', {
          method: 'POST',
        });

        if (res?.access_token) {
          setAccessToken(res.access_token);
          console.log('access_token 갱신 완료');
        }
      } catch (err) {
        console.warn('access_token 갱신 실패', err);
      }
    }, msUntilExpiry - buffer);

    return () => clearTimeout(timeout);
  }, [accessToken, setAccessToken]);

  return null;
}
