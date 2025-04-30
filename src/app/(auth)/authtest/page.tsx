'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function TestPage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    console.log('현재 유저:', user);
    console.log('현재 토큰:', token);
  }, [token, user]);

  return <div>전역 테스트</div>;
}
