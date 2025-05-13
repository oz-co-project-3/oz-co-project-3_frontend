// 정적 프리렌더링 방지 (disableStaticRendering)
export const dynamic = 'force-dynamic';

import PagenationBundle from '@/components/common/pagination/PagenationBundle';
import PublicJobPostingCard from '@/components/job-posting/PublicJobPostingCard';
import { PublicJobsResponse } from '@/types/publicJob';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string }>;
}) {
  const { page } = await searchParams;
  const pageSize = 10;
  console.log('page: ', page);
  const offset = (parseInt(page) - 1) * pageSize;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs?offset=${offset}&limit=${pageSize}`,
  );
  const publicJobs: PublicJobsResponse = await response.json();
  console.log('publicJobs: ', publicJobs);

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-4 rounded-md bg-white py-8'>
          <section className='flex flex-col gap-4 rounded-md px-8'>
            <h2 className='border-b pb-4 text-2xl font-bold'>공공일자리 정보</h2>
          </section>

          <ul className='flex flex-col gap-4 rounded-md px-8 py-4'>
            {publicJobs.data.map((publicJobPosting, index) => (
              <PublicJobPostingCard key={index} publicJobPosting={publicJobPosting} />
            ))}
          </ul>

          <PagenationBundle
            currentPage={parseInt(page)}
            totalCount={publicJobs.total}
            url='/public-jobs?page='
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
