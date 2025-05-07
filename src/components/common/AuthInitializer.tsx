'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const hasRefreshToken = () => {
    return document.cookie.includes('refresh_token=');
  };

  useEffect(() => {
    if (!hasRefreshToken()) {
      return;
    }
    const restoreUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/refresh-token/`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('토큰 재발급 실패');

        const data = await res.json();

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
      } catch {
        logout();
      }
    };

    restoreUser();
  }, [login, logout, router]);

  return null;
}
