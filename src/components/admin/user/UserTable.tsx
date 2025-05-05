'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { AdminUser } from '@/types/user';
import { ResumeModal } from '../resume/ResumeModal';
import { fetchOnClient } from '@/api/clientFetcher';

interface UserTableProps {
  userType: 'seeker' | 'business'; // 사용자 유형 (개인 또는 기업)
}

export function UserTable({ userType }: UserTableProps) {
  const [data, setData] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const router = useRouter();

  // 사용자 목록 조회 API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const users = await fetchOnClient<AdminUser[]>(`/api/admin/user`);

        const filtered = users.filter((user) => {
          const isTarget =
            userType === 'seeker' ? !!user.seeker : userType === 'business' ? !!user.corp : false;
          const isAdmin = user.base.user_type.includes('admin');
          return isTarget && !isAdmin;
        });

        setData(filtered);
      } catch (error) {
        console.error('회원 목록 실패:', error);
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

  // 사용자 테이블, 이력서 모달 렌더링
  return (
    <div className='mt-4'>
      <DataTable columns={getColumns(router, (id) => setSelectedUserId(id))} data={data} />
      {selectedUserId !== null && (
        <ResumeModal userId={selectedUserId} open={true} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
}
