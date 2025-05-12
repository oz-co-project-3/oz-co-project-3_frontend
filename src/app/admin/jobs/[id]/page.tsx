import fetchOnServer from '@/api/serverFetcher';
import JobPostingActionPanel from '@/components/admin/jobs/JobPostingActionPanel';
import AdminLayout from '@/components/common/layout/AdminLayout';
import JobPosting from '@/components/job-posting/JobPosting';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import { X } from 'lucide-react';
import Link from 'next/link';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/admin/job-posting/${id}/`);

    return (
      <AdminLayout>
        <div className='relative'>
          <div className='mb-8'>
            <Link
              href='/admin/jobs'
              className='absolute -top-2 right-0 z-10 rounded-full p-2 text-zinc-400 transition hover:text-zinc-600'
              aria-label='닫기'
            >
              <X className='h-6 w-6' />
            </Link>
          </div>

          {/* 공통 상세 내용 */}
          <JobPosting jobPosting={jobPosting} />

          <div className='mt-10'>        
            <JobPostingActionPanel id={String(id)} status={jobPosting.status} />
          </div>
        </div>
      </AdminLayout>
    );
  } catch (error) {
    return (
      <AdminLayout>
        <div className='p-10 text-center text-red-600'>
          <h2 className='mb-2 text-xl font-bold'>공고를 불러오는 데 실패했습니다.</h2>
          <p className='text-sm'>{(error as Error).message}</p>
        </div>
      </AdminLayout>
    );
  }
}
