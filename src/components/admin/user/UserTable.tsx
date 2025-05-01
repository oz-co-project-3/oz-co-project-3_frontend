'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { AdminUser } from '@/types/user';
import { useAuthStore } from '@/store/useAuthStore';

interface UserTableProps {
  userType: 'personal' | 'corporate';
}

// 회원 타입 매핑
const getExpectedBackendType = (frontendType: 'personal' | 'corporate') => {
  const map = {
    personal: 'seeker',
    corporate: 'business',
  } as const;
  return map[frontendType];
};

export function UserTable({ userType }: UserTableProps) {
  const [data, setData] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken); // 타입 오류 제거
  const logout = useAuthStore((state) => state.logout); // 401 로그아웃 처리

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/admin/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 전달
          },
        });

        if (res.status === 401) {
          console.warn('토큰 만료됨 - 로그아웃 처리');
          logout(); // 전역 로그아웃
          router.push('/user/login');
          return;
        }

        const result = await res.json();

        // 방어 코드: 배열 여부 확인
        if (!Array.isArray(result)) {
          throw new Error(`응답이 배열이 아닙니다: ${JSON.stringify(result)}`);
        }
        const backendType = getExpectedBackendType(userType);
        const filtered = result.filter(
          (user) => user.base.user_type === backendType && !user.base.is_superuser,
        );

        setData(filtered);
      } catch (error) {
        console.error('회원 목록 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 토큰 있을 때만 요청
    if (accessToken) {
      fetchUsers();
    }
  }, [userType, accessToken, router, logout]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-gray-400'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='mt-4'>
      <DataTable columns={getColumns(router)} data={data} />
    </div>
  );
}
