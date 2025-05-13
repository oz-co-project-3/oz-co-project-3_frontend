import fetchOnServer from '@/api/serverFetcher';
import { ResumeResponse } from '@/types/Schema/resumeSchema';
import ResumeForm from '@/components/resume/ResumeForm';

export default async function ResumeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const resume = await fetchOnServer<ResumeResponse>(`/api/resume/${id}/`);
  console.log(resume);

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <div className='flex justify-between border-b pb-2'>
        <h2 className='text-2xl font-bold'>이력서 수정</h2>
      </div>

      <ResumeForm defaultResume={resume} />
    </section>
  );
}
