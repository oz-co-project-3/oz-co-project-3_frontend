'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { AdminUser } from '@/types/user';
import { useAuthStore } from '@/store/useAuthStore';
import { ResumeModal } from '../resume/ResumeModal';

interface UserTableProps {
  userType: 'personal' | 'corporate';
}

const getExpectedBackendType = (frontendType: 'personal' | 'corporate') => {
  const map = {
    personal: 'seeker',
    corporate: 'business',
  } as const;
  return map[frontendType];
};

function extractAdminUsers(response: unknown): AdminUser[] {
  if (Array.isArray(response)) return response as AdminUser[];

  if (
    typeof response === 'object' &&
    response !== null &&
    'users' in response &&
    Array.isArray((response as { users: unknown }).users)
  ) {
    return (response as { users: AdminUser[] }).users;
  }

  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    Array.isArray((response as { data: unknown }).data)
  ) {
    return (response as { data: AdminUser[] }).data;
  }

  throw new Error(`배열 형태의 응답을 찾을 수 없음: ${JSON.stringify(response)}`);
}

export function UserTable({ userType }: UserTableProps) {
  const [data, setData] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/admin/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 401) {
          logout();
          router.push('/user/login');
          return;
        }

        const result = await res.json();
        const users = extractAdminUsers(result);

        const backendType = getExpectedBackendType(userType);
        const filtered = users.filter((user) => {
          const isTargetType =
            backendType === 'seeker'
              ? user.seeker !== null
              : backendType === 'business'
                ? user.corp !== null
                : false;

          return isTargetType && !user.base.is_superuser;
        });

        console.log('[백엔드 타입]', backendType);
        console.log('[응답 받은 user들]', users);
        console.log('[필터링 후]', filtered);

        setData(filtered);
      } catch (error) {
        console.error('회원 목록 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) fetchUsers();
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
      <DataTable columns={getColumns(router, (id) => setSelectedUserId(id))} data={data} />
      {selectedUserId !== null && (
        <ResumeModal userId={selectedUserId} open={true} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
}
