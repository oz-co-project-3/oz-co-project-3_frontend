import fetchOnServer from '@/api/serverFetcher';
import JobPostingBusinessCard from '@/components/job-posting/JobPostingBusinessCard';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';

export default async function PreviousJobPostingsPage() {
  const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/job_posting/', {
    cache: 'force-cache',
  });
  console.log(jobPostings);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredJobPostings = jobPostings.filter((jobPosting) => {
    const deadlineString = jobPosting.deadline; // 'yyyy-mm-dd'
    const [year, month, day] = deadlineString.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, day);
    return deadlineDate < today;
  });
  console.log(expiredJobPostings);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>이전 채용공고</h2>
          <Link
            href='/dashboard/business/job-postings/post'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            채용 공고 등록
          </Link>
        </div>

        {expiredJobPostings.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2 py-8'>
            <p className='text-lg text-gray-500'>마감일이 지난 채용공고가 없습니다.</p>
          </div>
        ) : (
          expiredJobPostings.map((jobPosting) => (
            <JobPostingBusinessCard key={jobPosting.id} jobPosting={jobPosting} type='expired' />
          ))
        )}
      </section>
    </>
  );
}

// 버튼 내용 바꾸기
// 마감일 연장 -> 재등록
// 수정 -> 수정 후 재등록
