'use client';

import { useSearchParams } from 'next/navigation'; // 추가
import FilterList from '@/components/filter/FilterList';
import PublicJobList from './PublicJobList';
import { useFilterJobs } from '@/hooks/useFilterJobs';
import Image from 'next/image';
import Loading from '@/app/loading';

export default function PublicJobsPage() {
  // props 제거
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search_keyword'); // .get() 사용
  const { data, loading } = useFilterJobs('공공', searchKeyword || undefined);
  console.log(data);

  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>공공일자리 정보</h1>
        <hr />
        <div className='bg-white'>
          <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
          <div className='mb-10 flex space-x-2'>
            <FilterList />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : data && data.data.length > 0 ? (
          <PublicJobList data={data} />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Image src='/SadCharacter2.png' alt='슬픈곰돌이 남' width={200} height={200} />
            <div>검색 결과가 없습니다.</div>
          </div>
        )}
      </main>
    </div>
  );
}
