'use client';

import FilterList from '@/components/common/filter/FilterList';
import PrivateJobList from './PrivateJobList';
import Image from 'next/image';
import Loading from '@/app/(main)/loading';
import { useSearchParams } from 'next/navigation';
import { useFilterJobs } from '@/hooks/useFilterJobs';

export default function PrivateJobsPage() {
  // searchParams가 Promise이므로 await 필요
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search_keyword'); // .get() 사용
  const { data, loading } = useFilterJobs('일반', searchKeyword || undefined); //훅을 이용해 필터링된 채용 정보 데이터를 가져온다
  // console.log('데이터 확인', data);

  return (
    <div className='mt-3 flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-4 rounded-md bg-white py-8'>
          <section className='flex flex-col gap-4 rounded-md px-8'>
            <h1 className='border-b pb-4 text-2xl font-bold'>일반채용 정보</h1>

            <div className='bg-white'>
              <h2 className='text-center text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
            </div>

            <FilterList />
            <div className='flex flex-col gap-4 rounded-md py-4'>
              {loading ? (
                <Loading />
              ) : data && data.data.length > 0 ? (
                <PrivateJobList data={data} />
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <Image src='/SadCharacter1.png' alt='검색 결과 없음' width={200} height={200} />
                  <div>검색 결과가 없습니다.</div>
                  <div>검색 조건을 변경하면 더 많은 결과를 찾을수 있어요!</div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
