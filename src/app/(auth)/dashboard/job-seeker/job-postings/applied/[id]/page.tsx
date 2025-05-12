import fetchOnServer from '@/api/serverFetcher';
import ConfirmButton from '@/components/common/ConfirmButton';
import JobPosting from '@/components/job-posting/JobPosting';
import { AppliedJobPosting, JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 이 지원의 엔터티 id
  const { id } = await params;
  console.log('이 지원의 엔터티 id: ', id);

  // 이 지원 (사건) - 여기에 들어있는 공고는 최소한의 정보만 가지고있음 (리스트용)
  const appliedJobPosting = await fetchOnServer<AppliedJobPosting>(`/api/applicants/seeker/${id}/`);
  console.log('이 지원 (사건) 의 정보: ', appliedJobPosting);

  // 이 지원 (사건) 에 연결되어 있는 공고 정보 (상세)
  const jobPosting = await fetchOnServer<JobPostingResponse>(
    `/api/postings/${appliedJobPosting.job_posting_id}/`,
  );
  console.log(jobPosting);
  console.log('이 지원 (사건) 의 유저 id: ', appliedJobPosting.user_id);
  console.log('이 지원 (사건) 의 이력서 id: ', appliedJobPosting.resume.id);

  // 지원 취소
  const withdrawApplication = async () => {
    'use server';

    // TODO: 에러 처리 (try, catch)
    const response = await fetchOnServer(
      `/api/postings/${appliedJobPosting.job_posting_id}/applicant/${id}/`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          resume: appliedJobPosting.resume.id,
          status: '지원 취소',
          memo: '',
        }),
      },
    );
    console.log('지원 취소 응답: ', response);
    revalidatePath('/dashboard/job-seeker/job-postings/applied');
    redirect('/dashboard/job-seeker/job-postings/applied');
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <h2 className='text-main-light mb-6 border-b pb-4 text-2xl font-bold'>
        지원한 채용 공고 조회
      </h2>
      <JobPosting jobPosting={jobPosting} />

      <ConfirmButton
        handleAction={withdrawApplication}
        title='지원 취소'
        contentText='지원했던 내역은 담당자가 취소 후에도 확인할 수 있습니다.'
        actionType='warning'
      />
    </section>
  );
}
