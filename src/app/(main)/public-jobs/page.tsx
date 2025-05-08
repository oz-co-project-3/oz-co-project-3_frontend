// app/public-jobs/page.tsx
import FilterList from '@/components/common/filter/FilterList';
import PublicJobList from './PublicJobList';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';

export default async function PublicJobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1. 쿼리 파라미터 추출
  const {
    search_keyword,
    location,
    position,
    employ_method,
    career,
    education,
    page = '0',
  } = searchParams;

  // 2. 서버 측 데이터 페칭
  const params = new URLSearchParams();
  params.set('employment_type', '공공');

  const validParams = [
    { key: 'search_keyword', value: search_keyword },
    { key: 'location', value: location },
    { key: 'position', value: position },
    { key: 'employ_method', value: employ_method },
    { key: 'career', value: career },
    { key: 'education', value: education },
    { key: 'offset', value: page },
  ];

  validParams.forEach(({ key, value }) => {
    if (value && value !== 'undefined') params.set(key, String(value));
  });

  // 3. fetch 캐싱 전략 설정
  const res = await fetch(`http://localhost:3000/api/public-jobs?/${params}`, {
    cache: 'no-store', //-> 저장하도록 바꾸자
  });

  if (!res.ok) throw new Error('데이터를 불러오는 데 실패했습니다');
  const data: JobPostingListResponse = await res.json();

  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>공공일자리 정보</h1>
        <hr />
        <div className='bg-white'>
          <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
          <div className='mb-10 flex space-x-2'>
            <FilterList initialParams={searchParams} />
          </div>
        </div>
        <PublicJobList data={data} />
      </main>
    </div>
  );
}

// TODO: 공공 일자리 API 연결하기
// offset, limit을 사용해서 페이지네이션 구현했어요. 밑에는 예시 코드 이거 조정해서 쓰시면 될것 같아요! (기태)
// 서버 컴포넌트에서는 잘 작동하는걸 확인했어요. 클라이언트 컴포넌트에서 사용할수 있게 수정해서 사용하세요! (SWR)
//
// import { PublicJobsResponse } from '@/types/publicJob';
//
// const response = await fetch('http://localhost:3000/api/public-jobs?offset=20&limit=20');
// const publicJobs: PublicJobsResponse = await response.json();
// console.log('publicJobs: ', publicJobs);
