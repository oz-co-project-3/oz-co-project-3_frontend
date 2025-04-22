import JobPostingSimpleCard from '@/components/dashboard/seeker/job-posting/JobPostingSimpleCard';

export default async function AppliedJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>내가 지원한 채용공고</h2>
        <div className='flex flex-wrap justify-center gap-4 py-4'>
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
          <JobPostingSimpleCard />
        </div>
      </section>
    </>
  );
}
