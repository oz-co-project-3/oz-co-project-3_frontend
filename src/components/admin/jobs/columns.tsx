import { JobPostingWithRejects } from '@/types/Schema/jobPostingSchema';
import { ColumnDef } from '@tanstack/react-table';

export type JobPosting = JobPostingWithRejects;

export const columns: ColumnDef<JobPosting>[] = [
  {
    accessorKey: 'title',
    header: '공고 제목',
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
