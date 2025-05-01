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
        if (!Array.isArray(result))
          throw new Error(`응답이 배열이 아님: ${JSON.stringify(result)}`);

        const backendType = getExpectedBackendType(userType);
        const filtered = result.filter(
          (user) => user.base.user_type === backendType && !user.base.is_superuser,
        );

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
