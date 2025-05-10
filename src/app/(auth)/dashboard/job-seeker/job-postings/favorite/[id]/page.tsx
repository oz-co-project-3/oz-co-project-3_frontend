import fetchOnServer from '@/api/serverFetcher';
import ConfirmButton from '@/components/common/ConfirmButton';
import JobPosting from '@/components/job-posting/JobPosting';
import ApplyButton from '@/components/job-posting/ApplyButton';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/postings/${id}/`);
  console.log(jobPosting);

  const cancelLike = async () => {
    'use server';

    const response = await fetchOnServer(`/api/job_posting/${id}/bookmark/`, {
      method: 'POST',
    });
    console.log(response);
    redirect('/dashboard/job-seeker/job-postings/favorite');
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      {/* <h2 className='border-b pb-4 text-2xl font-bold'>공고 상세 조회</h2> */}
      <JobPosting jobPosting={jobPosting} />

      <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
        <ConfirmButton
          handleAction={cancelLike}
          title='찜 취소'
          contentText='찜 목록에서 제거 하시겠습니까?'
          actionType='normal'
        />
        <ApplyButton jobPostingId={id} />
      </div>
    </section>
  );
}
