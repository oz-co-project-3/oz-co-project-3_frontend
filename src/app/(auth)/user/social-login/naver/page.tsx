'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function NaverCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const handleNaverCallback = async () => {
      if (!code || !state) {
        alert('잘못된 접근입니다.');
        router.replace('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/user/social-login/naver/callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ code, state }),
        });

        if (!res.ok) {
          throw new Error('콜백 처리 실패');
        }

        const data = await res.json();
        const { user_id, email, user_type, name } = data;

        login({
          id: user_id,
          email,
          user_type,
          name: name,
          signinMethod: ['naver'],
        }, data.access_token);

        router.replace('/');
      } catch (err) {
        console.error('네이버 로그인 처리 실패:', err);
        alert('로그인에 실패했습니다.');
        router.replace('/login');
      }
    };

    handleNaverCallback();
  }, [searchParams, login, router]);

  return <p>네이버 로그인 처리 중...</p>;
}
