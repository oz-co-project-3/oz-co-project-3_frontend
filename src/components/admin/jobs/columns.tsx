import { ColumnDef } from '@tanstack/react-table';

export type JobPosting = {
    id: number;
    title: string;
    company: string;
    location: string;
    employment_type: string;
    position: string;
    history: string;
    recruitment_count: number;
    education: string;
    deadline: string;
    salary: string;
    summary: string;
    description: string;
    status: string;
    view_count: number;
    report: number;
    reject_postings: { id: number; user: { id: number }; content: string }[];
    user: {
      id: number;
    };
  };
  

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
