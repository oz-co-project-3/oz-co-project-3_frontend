import fetchOnServer from '@/api/serverFetcher';
import JobPostingPublicCard from '@/components/job-posting/JobPostingPublicCard';
import { AppliedJobPosting } from '@/types/Schema/jobPostingSchema';

export default async function AppliedJobPostingsPage() {
  const jobPostings = await fetchOnServer<AppliedJobPosting[]>('/api/applicants/seeker/');
  console.log(jobPostings);

  // TODO: 지원 취소 까지 다 응답으로 옴.
  // 필터링해서 지원 된거만? 아니면 탭으로 나눠서 둘다 보여주기?
  // const appliedJobPostings = jobPostings.filter(
  //   (jobPosting) => jobPosting.status === '지원 완료',
  // );
  // const withdrawnJobPostings = jobPostings.filter(
  //   (jobPosting) => jobPosting.status === '지원 취소',
  // );

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>지원한 채용공고</h2>
        <div className='flex flex-wrap justify-center gap-4 py-4'>
          {jobPostings.length === 0 ? (
            <div className='flex flex-wrap justify-center gap-4 pt-8 pb-4'>
              <p className='text-center text-lg text-gray-500'>지원한 채용공고가 없습니다.</p>
            </div>
          ) : (
            jobPostings.map((jobPosting) => (
              <JobPostingPublicCard key={jobPosting.id} jobPosting={jobPosting} path='applied' />
            ))
          )}
        </div>
      </section>
    </>
  );
}
