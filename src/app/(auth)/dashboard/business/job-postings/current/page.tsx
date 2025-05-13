import fetchOnServer from '@/api/serverFetcher';
import JobPostingBusinessCard from '@/components/job-posting/JobPostingBusinessCard';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';

export default async function CurrentJobPostingsPage() {
  const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/job_posting/', {
    cache: 'force-cache',
  });
  // console.log(jobPostings);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentJobPostings = jobPostings.filter((jobPosting) => {
    const deadlineString = jobPosting.deadline; // 'yyyy-mm-dd'
    const [year, month, day] = deadlineString.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, day);
    return deadlineDate >= today;
  });
  console.log(currentJobPostings);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>현재 채용공고</h2>
          <Link
            href='/dashboard/business/job-postings/post'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            채용 공고 등록
          </Link>
        </div>

        {currentJobPostings.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2 py-8'>
            <p className='text-lg text-gray-500'>현재 진행중인 채용공고가 없습니다.</p>
          </div>
        ) : (
          currentJobPostings.map((jobPosting) => (
            <JobPostingBusinessCard key={jobPosting.id} jobPosting={jobPosting} type='current' />
          ))
        )}
      </section>
    </>
  );
}
