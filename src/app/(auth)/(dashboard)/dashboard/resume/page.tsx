import ResumeCard from '@/components/dashboard/seeker/resume/ResumeCard';
import Link from 'next/link';

export default async function ResumePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>내 이력서</h2>
        <ResumeCard id='1' />
        <ResumeCard id='2' />

        <article className='flex rounded-md border'>
          <Link
            href='/dashboard/resume/create'
            className='text-main-light flex h-56 grow cursor-pointer items-center justify-center rounded-md p-2 font-extrabold transition-all duration-150 hover:text-xl hover:underline'
          >
            새 이력서
          </Link>
        </article>
      </section>
    </>
  );
}
