import { JobPostingWithRejects } from '@/types/Schema/jobPostingSchema';
import { ColumnDef } from '@tanstack/react-table';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type JobPosting = JobPostingWithRejects;

export const getColumns = (router: AppRouterInstance): ColumnDef<JobPosting>[] => [
  {
    accessorKey: 'title',
    header: '공고 제목',
    cell: ({ row }) => (
      <button
        className='text-blue-600 underline hover:opacity-70'
        onClick={() => router.push(`/admin/jobs/${row.original.id}`)}
      >
        {row.original.title}
      </button>
    ),
  },
  {
    accessorKey: 'company',
    header: '회사명',
  },
  {
    accessorKey: 'location',
    header: '근무지',
  },
  {
    accessorKey: 'employment_type',
    header: '고용 형태',
  },
  {
    accessorFn: (row) => row.user.id,
    id: 'user_id',
    header: '회원 ID',
  },
  {
    accessorKey: 'status',
    header: '상태',
  },
];
