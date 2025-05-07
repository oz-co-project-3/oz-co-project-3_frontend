import fetchOnServer from '@/api/serverFetcher';
import JobPostingPublicCard from '@/components/job-posting/JobPostingPublicCard';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';

export default async function FavoriteJobPostingsPage() {
  // const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/user/profile/bookmark/');
  // 아직 빈 배열이라, 임시로 모든 공고 조회

  const jobPostings = await fetchOnServer<JobPostingResponse[]>('/api/job_posting/');
  console.log(jobPostings);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>찜한 채용공고</h2>
        <div className='flex flex-wrap justify-center gap-4 py-4'>
          {jobPostings.length === 0 ? (
            <div className='flex flex-wrap justify-center gap-4 pt-8 pb-4'>
              <p className='text-center text-lg text-gray-500'>찜한 채용공고가 없습니다.</p>
            </div>
          ) : (
            jobPostings.map((jobPosting) => (
              <JobPostingPublicCard key={jobPosting.id} jobPosting={jobPosting} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
