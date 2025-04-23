import FilterList from '@/components/filter/FilterList';
import JobPostingList from './PrivateJobList';
import { Suspense } from 'react';

export default async function PrivateJobsPage() {
  const res = await fetch(`http://localhost:8000/api/postings/?employment_type=일반`);
  const data = await res.json();

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
          <JobPostingList data={data} />
        </Suspense>
      </main>
    </div>
  );
}
