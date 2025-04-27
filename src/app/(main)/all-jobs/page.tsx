import { Suspense } from 'react';
import AllJobList from './AllJobList';

export const dynamic = 'force-dynamic';

export default async function AllJobsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchKeyword = resolvedSearchParams?.search_keyword;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_BASE_URL}/api/postings/?` +
      (searchKeyword ? `&search_keyword=${encodeURIComponent(searchKeyword)}` : ''),
  );
  const data = await res.json();
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>{searchKeyword}에 대한 검색 결과입니다 </h1>
        <hr />
        <div className='mb-10 flex space-x-2'></div>
        <Suspense fallback={<div>로딩 중...</div>}>
          <AllJobList data={data} />
        </Suspense>
      </main>
    </div>
  );
}
