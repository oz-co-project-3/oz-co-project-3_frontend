'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { getColumns } from './columns';
import { AdminUser } from '@/types/user';
import { ResumeModal } from '../resume/ResumeModal';
import { apiFetch } from '@/lib/fetcher';

interface UserTableProps {
  userType: 'seeker' | 'business'; // 사용자 유형 (개인 또는 기업)
}

// 응답 객체에서 AdminUser 배열 추출
function extractAdminUsers(response: unknown): AdminUser[] {
  if (Array.isArray(response)) {
    return response as AdminUser[];
  }
  return [];
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
        const result = await apiFetch<unknown>(`/api/admin/user`);
        const users = extractAdminUsers(result);

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
