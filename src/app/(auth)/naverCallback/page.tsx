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

        // 여기 signinMethod 스웨거에 응답 오는 항목중에 없어요!! (기태)
        const { email, name, user_type, user_id, signinMethod, access_token } = data;
        login({ id: user_id, email, name, user_type, signinMethod });
        useAuthStore.setState({ accessToken: access_token });
        //localStorage.setItem('access_token', access_token);
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
