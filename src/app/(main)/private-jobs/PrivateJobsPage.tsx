'use client';

import FilterList from '@/components/filter/FilterList';
import JobPostingList from './JobPostingList';

export default function PrivateJobsPage() {
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>일반채용 정보</h1>
        <hr />
        <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
        <div className='mb-10 flex space-x-2'>
          <FilterList />
        </div>
        <JobPostingList />
      </main>
    </div>
  );
}
