'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface RefreshTokenResponse {
  access_token: string;
  user_id: number;
  email: string;
  name: string;
  user_type: string;
  signinMethod: 'email' | 'kakao' | 'naver';
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('토큰 재발급 실패');

        const data: RefreshTokenResponse = await res.json();

        login(
          {
            id: data.user_id,
            email: data.email,
            name: data.name,
            user_type: data.user_type,
            signinMethod: data.signinMethod,
          },
          data.access_token,
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
