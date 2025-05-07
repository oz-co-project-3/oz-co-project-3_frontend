'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    const fetchKakaoLogin = async () => {
      if (!code) {
        alert('인가코드 없음');
        router.replace('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/user/social-login/kakao/callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        localStorage.setItem('access_token', data.access_token);
        router.replace('/');
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
        alert('로그인에 실패했습니다.');
        router.replace('/login');
      }
    };

    fetchKakaoLogin();
  }, [searchParams, router]);

  return <p>카카오 로그인 처리 중입니다...</p>;
}
