import fetchOnServer from '@/api/serverFetcher';
import JobPostingSeekerCard from '@/components/job-posting/JobPostingSeekerCard';
import { FavoriteJobPosting } from '@/types/Schema/jobPostingSchema';

export default async function FavoriteJobPostingsPage() {
  const jobPostings = await fetchOnServer<FavoriteJobPosting[]>('/api/user/profile/bookmark/');
  console.log(jobPostings);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>찜한 채용공고</h2>
        <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
          {jobPostings.length === 0 ? (
            <div className='flex flex-wrap justify-center gap-4 pt-8 pb-4'>
              <p className='text-center text-lg text-gray-500'>찜한 채용공고가 없습니다.</p>
            </div>
          ) : (
            jobPostings.map((jobPosting) => (
              <JobPostingSeekerCard key={jobPosting.id} jobPosting={jobPosting} path='favorite' />
            ))
          )}
        </div>
      </section>
    </>
  );
}
