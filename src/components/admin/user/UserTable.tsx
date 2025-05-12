'use client';

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { ResumeModal } from '../resume/ResumeModal';
import { fetchOnClient } from '@/api/clientFetcher';
import { UserProfileResponse } from '@/types/user';
import SkeletonPlaceholder from '@/components/common/SkeletonPlaceholder';

interface UserTableProps {
  userType: 'seeker' | 'business';
  fallback?: React.ReactNode;
}

export function UserTable({ userType, fallback }: UserTableProps) {
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
    return fallback ?? <SkeletonPlaceholder rows={6} columns={4} />;
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
