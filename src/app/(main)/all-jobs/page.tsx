import { Suspense } from 'react';
import AllJobList from './AllJobList';
import Image from 'next/image';
import Loading from '@/app/loading';

export const dynamic = 'force-dynamic';

export default async function AllJobsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchKeyword = resolvedSearchParams?.search_keyword;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/postings/?` +
      (searchKeyword ? `&search_keyword=${encodeURIComponent(searchKeyword)}` : ''),
  );
  const data = await res.json();
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>
          {!searchKeyword ? (
            '전체 채용공고'
          ) : (
            <>
              <span className='text-main'>{searchKeyword}</span>에 대한 검색 결과입니다
            </>
          )}
        </h1>
        <hr />
        <div className='mb-10 flex space-x-2'></div>
        <Suspense fallback={<Loading />}>
          {data.data.length > 0 ? (
            <AllJobList data={data} />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <div className='flex space-x-5'>
                <Image src='/SadCharacter2.png' alt='슬픈곰돌이 남' width={200} height={200} />
                <Image src='/SadCharacter1.png' alt='슬픈곰돌이 여' width={200} height={200} />
              </div>
              <div>검색 결과가 없습니다.</div>
              <div>검색 조건을 변경하면 더 많은 결과를 찾을수 있어요!</div>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}
