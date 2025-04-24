import { Button } from '@/components/ui/button';
// import { JobPosting } from '@/types/jobPosting';
import Link from 'next/link';

export default async function JobPostingCard() {
  // 포스팅 하나 인자로 받아오기
  // { jobPosting }: { jobPosting: JobPosting }
  // console.log(jobPosting);

  return (
    <section className='cursor-pointer rounded-md border'>
      <Link
        href={`/dashboard/company/job-posting/id`}
        className='flex gap-4 px-8 py-6 max-sm:flex-col sm:justify-between'
      >
        <div className='flex grow flex-col justify-between'>
          <h3 className='text-lg font-bold'>제목</h3>

          <div className='flex gap-2'>
            <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>직무</span>
            <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>(비)정규</span>
            <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>마감일</span>
            <span className='rounded-md bg-gray-100 px-2 py-1 text-sm'>조회수</span>
          </div>
        </div>

        {/* job_posting 받아온거에서 status가 closed 이면 이걸로 렌더링 */}
        <div className='flex min-w-40 gap-2 sm:flex-col sm:justify-end'>
          <Button>지원자 보기</Button>
          {/* 공고 수정 페이지로 */}
          <Button>재등록</Button>
        </div>
      </Link>
    </section>
  );
}
