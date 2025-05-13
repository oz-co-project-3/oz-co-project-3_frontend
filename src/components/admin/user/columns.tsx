'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserProfileResponse } from '@/types/user';
import { Button } from '@/components/ui/button';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const getColumns = (
  router: AppRouterInstance,
  onOpenResumeModal: (userId: number) => void,
): ColumnDef<UserProfileResponse>[] => {
  return [
    {
      accessorKey: 'base.id',
      header: 'ID',
    },
    {
      accessorKey: 'seeker.name',
      header: '이름',
      cell: ({ row }) => {
        const user = row.original;
        const name = user.seeker?.name || user.corp?.company_name || '-';
        const userId = user.base.id;

        // user_type 변환 후 확인
        const userTypes = user.base.user_type.split(',');
        const isSeeker = userTypes.includes('seeker') || user.seeker !== null;

        return (
          <div className='flex items-center gap-2'>
            <span>{name}</span>
            <div className='ml-6 flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='px-2 py-1 text-xs'
                onClick={() => router.push(`/admin/user/${userId}/`)}
              >
                프로필
              </Button>

              {isSeeker && (
                <Button
                  variant='outline'
                  size='sm'
                  className='px-2 py-1 text-xs'
                  onClick={() => onOpenResumeModal(userId)}
                >
                  이력서
                </Button>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'base.email',
      header: '이메일',
      cell: ({ row }) => row.original.base.email || '-',
    },
    {
      id: 'phone_number',
      header: '전화번호',
      cell: ({ row }) =>
        row.original.seeker?.phone_number || row.original.corp?.manager_phone_number || '-',
    },
    {
      accessorKey: 'base.user_type',
      header: '회원 구분',
      cell: ({ row }) => {
        const types = row.original.base.user_type.split(',');
        if (types.includes('business')) return '기업회원';
        if (types.includes('seeker')) return '개인회원';
        return '-';
      },
    },
    {
      accessorKey: 'base.created_at',
      header: '가입일',
      cell: ({ row }) => {
        const createdAt = row.original.base.created_at;
        return createdAt
          ? new Date(createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          : '-';
      },
    },
  ];
};
