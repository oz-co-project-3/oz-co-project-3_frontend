'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchOnClient } from '@/api/clientFetcher';
import { LoginResponseData } from '@/types/user';
import { Suspense } from 'react';

export default function NaverCallbackPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <NaverCallbackContent />
    </Suspense>
  );
}

function NaverCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      alert('잘못된 접근입니다.');
      return;
    }

    const fetchToken = async () => {
      try {
        const data = await fetchOnClient<LoginResponseData>(
          '/api/user/social-login/naver/callback/',
          {
            method: 'POST',
            skipContentType: false,
            credentials: 'include',
            body: JSON.stringify({ code, state }),
          },
        );

        login(
          {
            id: data.user_id,
            email: data.email,
            name: data.name,
            user_type: data.user_type,
            signinMethod: 'naver',
          },
          data.access_token,
        );

        router.push('/');
      } catch (err) {
        console.error('❌ 네이버 로그인 처리 실패:', err);
        alert('네이버 로그인에 실패했습니다.');
        router.push('/user/login');
      }
    };

    fetchToken();
  }, [searchParams, router, login]);

  return <div className='p-6 text-center text-lg'>네이버 로그인 처리 중입니다...</div>;
}
