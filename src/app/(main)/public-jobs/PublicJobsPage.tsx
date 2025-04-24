import FilterList from '@/components/filter/FilterList';
import JobPostingList from './PublicJobList';
import { Suspense } from 'react';

export default async function PublicJobsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postings/?employment_type=공공`);
  //임시로 배포 주소로 보냄 8000으로 해야함
  // https://senior-tomorrow.o-r.kr/
  // http://localhost:8000/
  const data = await res.json();
  console.log(data);

  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>공공일자리 정보</h1>
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
