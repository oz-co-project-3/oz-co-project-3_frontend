import JobPostingCard from '@/components/job-posting/JobPostingCard';
import Link from 'next/link';

export default async function CurrentJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>현재 채용공고</h2>
          <Link
            href='/company-dashboard/job-posting/create'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            채용 공고 등록
          </Link>
        </div>
        <JobPostingCard id='1' />
        <JobPostingCard id='2' />
        <JobPostingCard id='3' />
        <JobPostingCard id='4' />
        <JobPostingCard id='5' />
        <JobPostingCard id='6' />
      </section>
    </>
  );
}
