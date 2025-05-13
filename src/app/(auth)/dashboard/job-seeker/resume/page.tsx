import fetchOnServer from '@/api/serverFetcher';
import ResumeCard from '@/components/resume/ResumeCard';
import { ResumeListResponse } from '@/types/Schema/resumeSchema';
import Link from 'next/link';

export default async function ResumePage() {
  const { data: resumes } = await fetchOnServer<ResumeListResponse>('/api/resume/', {
    cache: 'force-cache',
  });
  console.log(resumes);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>내 이력서</h2>
          <Link
            href='/dashboard/job-seeker/resume/post'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            이력서 등록
          </Link>
        </div>
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}

        <article className='flex rounded-md border'>
          <Link
            href='/dashboard/job-seeker/resume/post'
            className='text-main-light flex h-32 grow cursor-pointer items-center justify-center rounded-md p-2 font-extrabold transition-all duration-150 hover:text-xl hover:underline'
          >
            새 이력서
          </Link>
        </article>
      </section>
    </>
  );
}
