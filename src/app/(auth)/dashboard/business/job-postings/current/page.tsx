import fetchOnServer from '@/api/serverFetcher';
import JobPostingCard from '@/components/job-posting/JobPostingCard';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';

export default async function CurrentJobPostingsPage() {
  const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/job_posting/');
  console.log(jobPostings);

  // TODO: 마감일 지나지 않은 것만 필터링하기
  // const currentJobPostings = jobPostings.filter(
  //   (jobPosting) => jobPosting.deadline > new Date(), // 대충 이런식으로 (로직 안맞음 아직)
  // );
  // console.log(currentJobPostings);

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
        {jobPostings.map((jobPosting) => (
          <JobPostingCard key={jobPosting.id} jobPosting={jobPosting} />
        ))}
      </section>
    </>
  );
}
