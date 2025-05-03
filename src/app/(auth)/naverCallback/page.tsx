'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function NaverCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) return;

    const fetchCallback = async () => {
      try {
        const res = await fetch(`/api/user/social-login/naver/callback/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, state }),
        });

        const data = await res.json();

        const { access_token, email, name, user_type, user_id, signinMethod } = data;
        login({ id: user_id, email, name, user_type, signinMethod }, access_token);
        localStorage.setItem('access_token', access_token);
        router.push('/');
      } catch (err) {
        console.error('네이버 로그인 실패:', err);
        alert('로그인에 실패했습니다.');
      }
    };

    fetchCallback();
  }, [searchParams, login, router]);

  return <p>로그인 처리 중입니다...</p>;
}