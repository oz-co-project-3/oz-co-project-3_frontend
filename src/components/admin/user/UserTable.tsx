'use client';

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { ResumeModal } from '../resume/ResumeModal';
import { fetchOnClient } from '@/api/clientFetcher';
import { UserProfileResponse } from '@/types/user';

interface UserTableProps {
  userType: 'seeker' | 'business';
}

export function UserTable({ userType }: UserTableProps) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data = [], isLoading } = useSWR<UserProfileResponse[]>('/api/admin/user/', fetchOnClient);

  // 사용자 유형에 따라 필터링
  const filteredUsers = useMemo(() => {
    return data.filter((user) => {
      const isTarget =
        userType === 'seeker' ? !!user.seeker : userType === 'business' ? !!user.corp : false;
      const isAdmin = user.base.user_type.includes('admin');
      return isTarget && !isAdmin;
    });
  }, [data, userType]);

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-gray-400'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='mt-4'>
      <DataTable columns={getColumns(router, (id) => setSelectedUserId(id))} data={filteredUsers} />
      {selectedUserId !== null && (
        <ResumeModal userId={selectedUserId} open={true} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
}
