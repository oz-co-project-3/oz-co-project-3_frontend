'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AdminUser } from '@/types/user';
import { Button } from '@/components/ui/button';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const getColumns = (router: AppRouterInstance): ColumnDef<AdminUser>[] => {
  return [
    {
      accessorKey: 'base.id',
      header: 'ID',
    },
    {
      accessorKey: 'seeker.name',
      header: '이름',
      cell: ({ row }) => {
        const seekerName = row.original.seeker?.name;
        const corpName = row.original.corp?.company_name;
        const name = seekerName || corpName || '-';

        return (
          <div className='flex items-center gap-2'>
            <span>{name}</span>
            <div className='ml-6'>
              <Button
                variant='outline'
                size='sm'
                className='mr-2 px-2 py-1 text-xs'
                onClick={() => router.push(`/admin/user/${row.original.base.id}`)}
              >
                프로필
              </Button>
              <Button variant='outline' size='sm' className='px-2 py-1 text-xs'>
                이력서
              </Button>
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
        const type = row.original.base.user_type;
        if (type === 'seeker') return '개인회원';
        if (type === 'business') return '기업회원';
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
