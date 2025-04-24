import FilterList from '@/components/filter/FilterList';
import PrivateJobList from './PrivateJobList';
import { Suspense } from 'react';

export default async function PrivateJobsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postings/?employment_type=일반`);
  const data = await res.json();
  // console.log(data);

  // https://senior-tomorrow.o-r.kr/
  // const response = await fetch(`http://localhost:8000/api/postings/`);
  // const data2 = await response.json();
  // console.log(data2);

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
          <PrivateJobList data={data} />
        </Suspense>
      </main>
    </div>
  );
}
