import fetchOnServer from '@/api/serverFetcher';
import ExpiredJobPostingCardTemp from '@/components/job-posting/ExpiredJobPostingCardTemp';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Link from 'next/link';

export default async function PreviousJobPostingsPage() {
  const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/job_posting/');
  console.log(jobPostings);

  // TODO: 마감일 지난 것만 필터링하기
  // const expiredJobPostings = jobPostings.filter(
  //   (jobPosting) => jobPosting.deadline < new Date(), // 대충 이런식으로 (로직 안맞음 아직)
  // );
  // console.log(expiredJobPostings);

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

        {jobPostings.map((jobPosting) => (
          <ExpiredJobPostingCardTemp key={jobPosting.id} jobPosting={jobPosting} />
        ))}
      </section>
    </>
  );
}

// 버튼 내용 바꾸기
// 마감일 연장 -> 재등록
// 수정 -> 수정 후 재등록
