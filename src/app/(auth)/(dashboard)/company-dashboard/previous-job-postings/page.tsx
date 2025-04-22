import JobPostingCard from '@/components/dashboard/company/job-posting/JobPostingCard';

export default async function PreviousJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>이전 채용공고</h2>
        <JobPostingCard />
        <JobPostingCard />
        <JobPostingCard />
        <JobPostingCard />
        <JobPostingCard />
        <JobPostingCard />
      </section>
    </>
  );
}
