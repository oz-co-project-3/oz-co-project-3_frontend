import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';
// import BusinessButtonBundle from './BusinessButtonBundle';

export default async function JobPostingBusinessCard({
  jobPosting,
  type,
}: {
  jobPosting: JobPostingResponse;
  type: 'current' | 'expired';
}) {
  return (
    <section className='relative flex cursor-pointer gap-4 rounded-md border px-4 py-2 max-sm:flex-col sm:justify-between md:px-8 md:py-6'>
      <Link
        href={`/dashboard/business/job-postings/${type}/${jobPosting.id}`}
        className='absolute inset-0 grow'
      >
        <span className='sr-only'>공고 상세보기</span>
      </Link>

      <div className='flex grow flex-col justify-between gap-4'>
        <h3 className='text-lg font-bold'>{jobPosting.title}</h3>

        <div className='flex flex-wrap gap-2'>
          <div className='rounded-md bg-gray-100 px-2 py-1 text-sm'>{jobPosting.position}</div>
          <div className='rounded-md bg-gray-100 px-2 py-1 text-sm'>{jobPosting.employ_method}</div>
          <div className='rounded-md bg-gray-100 px-2 py-1 text-sm'>
            <span className='text-gray-500'>마감:</span>{' '}
            {jobPosting.deadline.slice(5).replace('-', '/')}
          </div>
          <div className='rounded-md bg-gray-100 px-2 py-1 text-sm'>
            <span className='text-gray-500'>조회:</span> {jobPosting.view_count}
          </div>
        </div>
      </div>

      {/* 컴포넌트 분리 */}
      {/* job_posting 받아온거에서 status가 open 이면 이걸로 렌더링 (마감일 안 지났으면?) */}
      {/* <BusinessButtonBundle id={jobPosting.id} /> */}

      {/* job_posting 받아온거에서 status가 closed 이면 이걸로 렌더링 (마감일 지났으면?) */}
      {/* <div className='flex min-w-40 gap-2 sm:flex-col sm:justify-end'>
          <Button>지원자 보기</Button> */}
      {/* 공고 수정 페이지로 */}
      {/* <Button>재등록</Button>
        </div> */}
    </section>
  );
}

// 폐기 예정
