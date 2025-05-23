import fetchOnServer from '@/api/serverFetcher';
import JobPosting from '@/components/job-posting/JobPosting';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import LikedButton from '@/components/common/likebutton/LikedButton';
import ApplyFlow from '../../../../components/common/modals/ApplyFlow';

//공공 상세페이지
export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 폴더명이 [id]라면 params.id로 접근
  const { id } = await params;

  const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/postings/${id}/`);

  return (
    <div>
      <JobPosting jobPosting={jobPosting} />
      <div className='flex min-h-screen flex-col'>
        <footer className='fixed bottom-0 left-0 z-50 flex h-[80px] w-full flex-row items-center justify-center gap-1 bg-white'>
          <div className='flex h-[50px] w-[50px] items-center justify-center rounded-2xl border'>
            <LikedButton id={jobPosting.id} is_bookmarked={jobPosting.is_bookmarked} />
          </div>
          <ApplyFlow id={jobPosting.id} />
        </footer>
      </div>
    </div>
  );
}

// 유주님 버전
