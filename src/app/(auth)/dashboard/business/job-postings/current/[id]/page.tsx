import fetchOnServer from '@/api/serverFetcher';
import JobPosting from '@/components/job-posting/JobPosting';
import ConfirmButton from '@/components/common/ConfirmButton';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/job_posting/${id}/`);
  console.log(jobPosting);

  const deleteJobPosting = async () => {
    'use server';

    // TODO: 에러 처리 (try, catch)
    const response = await fetchOnServer(`/api/job_posting/${id}/`, {
      method: 'DELETE',
    });
    console.log(response);
    redirect('/dashboard/business/job-postings/current');
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      {/* <h2 className='border-b pb-4 text-2xl font-bold'>공고 상세 조회</h2> */}
      <JobPosting jobPosting={jobPosting} />

      <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
        <Link
          href={`/dashboard/business/job-postings/current/${id}/edit`}
          className='bg-main-light hover:bg-main-dark flex grow cursor-pointer items-center justify-center rounded-md p-2 text-white'
        >
          수정
        </Link>
        <ConfirmButton
          handleAction={deleteJobPosting}
          title='삭제'
          contentText='삭제한 공고는 복구할 수 없습니다.'
          actionType='warning'
        />
      </div>
    </section>
  );
}
