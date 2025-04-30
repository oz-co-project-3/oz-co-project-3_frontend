// app/private-jobs/page.tsx

import FilterList from '@/components/filter/FilterList';
import PrivateJobList from './PrivateJobList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function PrivateJobsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  // searchParams가 Promise이므로 await 필요
  const resolvedSearchParams = await searchParams;
  const searchKeyword = resolvedSearchParams?.search_keyword;

  console.log(process.env.INTERNAL_BASE_URL);

  const res = await fetch(
    `${process.env.INTERNAL_BASE_URL}/api/postings/?employment_type=일반` +
      (searchKeyword ? `&search_keyword=${encodeURIComponent(searchKeyword)}` : ''),
  );
  const data = await res.json();
  console.log(data);

  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>일반채용 정보</h1>
        <hr />
        <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
        <div className='mb-10 flex space-x-2'>
          <FilterList />
        </div>
        <Suspense fallback={<div>로딩 중...</div>}>
          {data.data.length > 0 ? <PrivateJobList data={data} /> : <div>검색 결과가 없습니다.</div>}
        </Suspense>
      </main>
    </div>
  );
}
