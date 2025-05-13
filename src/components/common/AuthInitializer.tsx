'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchOnClient } from '@/api/clientFetcher';
import { UserBaseProfile } from '@/types/user';

interface RefreshTokenResponse {
  access_token: string;
}

function hasRefreshToken(): boolean {
  return document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith('refresh_token='));
}

export default function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!hasRefreshToken()) return;

    const restoreUser = async () => {
      try {
        // 1. access_token 재발급 요청
        const tokenRes = await fetchOnClient<RefreshTokenResponse>('/api/user/refresh-token/', {
          method: 'POST',
          skipContentType: true,
        });

        const accessToken = tokenRes.access_token;

        // 2. access_token으로 유저 정보 조회
        const profile = await fetchOnClient<UserBaseProfile>('/api/user/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        login(
          {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            user_type: profile.user_type,
            signinMethod: profile.signinMethod,
          },
          accessToken,
        );

        console.log('✅ 로그인 상태 복원 완료');
      } catch (err) {
        console.error('❌ 로그인 복원 실패:', err);
        logout();
      }
    };

    restoreUser();
  }, [login, logout]);

  return null;
}
