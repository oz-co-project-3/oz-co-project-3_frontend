import fetchOnServer from '@/api/serverFetcher';
import { ResumeResponse } from '@/types/Schema/resumeSchema';
import Resume from '@/components/resume/Resume';

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  console.log(id);

  const resume = await fetchOnServer<ResumeResponse>(`/api/resume/${id}/`);
  console.log(resume);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>선택한 지원자 이력서 조회</h2>
        <Resume resume={resume} />
      </section>
    </>
  );
}
