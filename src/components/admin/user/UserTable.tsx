'use client';

import { useEffect, useState } from 'react';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { AdminUser } from '@/types/user';

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

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/admin/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          },
        });

        const result: AdminUser[] = await res.json();
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

    fetchUsers();
  }, [userType]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-gray-400'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='mt-4'>
      <DataTable columns={getColumns()} data={data} />
    </div>
  );
}
