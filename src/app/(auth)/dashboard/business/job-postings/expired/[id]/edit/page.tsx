import fetchOnServer from '@/api/serverFetcher';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import JobPostingForm from '@/components/job-posting/JobPostingForm';

export default async function ExpiredJobPostingEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/job_posting/${id}/`);
  console.log(jobPosting);

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <div className='flex justify-between border-b pb-2'>
        <h2 className='text-2xl font-bold'>채용공고 수정</h2>
      </div>

      <JobPostingForm defaultJobPosting={jobPosting} />
    </section>
  );
}
