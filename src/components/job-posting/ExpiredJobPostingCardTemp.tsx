import { Button } from '@/components/ui/button';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
// import { JobPosting } from '@/types/jobPosting';
import Link from 'next/link';

export default async function ExpiredJobPostingCardTemp({
  jobPosting,
}: {
  jobPosting: JobPostingResponse;
}) {
  console.log(jobPosting);

  return (
    <section className='relative flex cursor-pointer gap-4 rounded-md border px-8 py-6 max-sm:flex-col sm:justify-between'>
      <Link href={`/dashboard/business/job-postings/expired/id`} className='absolute inset-0 grow'>
        <span className='sr-only'>공고 상세보기</span>
      </Link>

      <div className='flex grow flex-col justify-between'>
        <h3 className='text-lg font-bold'>{jobPosting.title}</h3>

        <div className='flex gap-2'>
          <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>{jobPosting.position}</span>
          <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>
            {jobPosting.employ_method}
          </span>
          <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>
            마감일: {jobPosting.deadline}
          </span>
          <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>
            조회수: {jobPosting.view_count}
          </span>
        </div>
      </div>

      {/* job_posting 받아온거에서 status가 closed 이면 이걸로 렌더링 */}
      <div className='z-10 flex min-w-40 gap-2 sm:flex-col sm:justify-end'>
        <Button>지원자 보기</Button>
        {/* 공고 수정 페이지로 */}
        <Button>재등록</Button>
      </div>
    </section>
  );
}
