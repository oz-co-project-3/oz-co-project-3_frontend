import { ColumnDef } from '@tanstack/react-table';
import { AdminUser } from '@/types/user';

export const columns: ColumnDef<AdminUser>[] = [
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
      return seekerName || corpName || '-';
    },
  },
  {
    accessorKey: 'base.email',
    header: '이메일',
    cell: ({ row }) => row.original.base.email || '-',
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
