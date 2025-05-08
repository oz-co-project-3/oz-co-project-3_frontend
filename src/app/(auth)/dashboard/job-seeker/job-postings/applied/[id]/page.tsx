import fetchOnServer from '@/api/serverFetcher';
import JobPosting from '@/components/job-posting/JobPosting';
import { Button } from '@/components/ui/button';
import { AppliedJobPosting, JobPostingResponse } from '@/types/Schema/jobPostingSchema';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 이 지원 (사건) 의 엔터티 id
  const { id } = await params;

  // 이 지원 (사건) - 여기에 들어있는 공고는 최소한의 정보만 가지고있음 (리스트용)
  const appliedJobPosting = await fetchOnServer<AppliedJobPosting>(`/api/applicants/seeker/${id}/`);

  // 이 지원 (사건) 에 연결되어 있는 공고 정보 (상세)
  const jobPosting = await fetchOnServer<JobPostingResponse>(
    `/api/postings/${appliedJobPosting.job_posting_id}/`,
  );
  // console.log(jobPosting);

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      {/* <h2 className='border-b pb-4 text-2xl font-bold'>공고 상세 조회</h2> */}
      <JobPosting jobPosting={jobPosting} />
      {/* 컴포넌트 분리 (클라이언트 컴포넌트) */}
      <div className='flex justify-center gap-2'>
        {/* 확인 모달 추가 */}
        <Button variant='destructive' className='grow cursor-pointer'>
          삭제
        </Button>
        {/* 수정 페이지로 링크 */}
        <Button className='grow cursor-pointer'>수정</Button>
      </div>
    </section>
  );
}
