import JobPostingCard from '@/components/dashboard/company/job-posting/JobPostingCard';
import { Button } from '@/components/ui/button';

export default async function CurrentJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>현재 채용공고</h2>
          <Button className='bg-main-light hover:bg-main-dark cursor-pointer'>
            채용 공고 등록
          </Button>
        </div>
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
