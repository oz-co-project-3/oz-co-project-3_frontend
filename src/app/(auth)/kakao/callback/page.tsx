'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchOnClient } from '@/api/clientFetcher'; 
import { useAuthStore } from '@/store/useAuthStore';
import { LoginResponseData } from '@/types/user';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = searchParams.get('code');
    const storedState = localStorage.getItem('kakao_login_state');

    if (!code || !storedState) {
      alert('카카오 로그인 실패: code 또는 state 누락');
      return;
    }

    const fetchToken = async () => {
      try {
        const data = await fetchOnClient<LoginResponseData>(
          '/api/user/social-login/kakao/callback/',
          {
            method: 'POST',
            skipContentType: false,
            credentials: 'include',
            body: JSON.stringify({ code, state: storedState }),
          },
        );

        localStorage.removeItem('kakao_login_state');

        login(
          {
            id: data.user_id,
            email: data.email,
            name: data.name,
            user_type: data.user_type,
            signinMethod: 'kakao',
          },
          data.access_token,
        );

        console.log('카카오 로그인 완료:', data);
        router.push('/');
      } catch (err) {
        console.error('카카오 로그인 처리 실패:', err);
        alert('카카오 로그인 처리 중 오류가 발생했습니다.');
        router.push('/user/login');
      }
    };

    fetchToken();
  }, [searchParams, router, login]);

  return <div className='p-6 text-center text-lg'>카카오 로그인 처리 중입니다...</div>;
}
