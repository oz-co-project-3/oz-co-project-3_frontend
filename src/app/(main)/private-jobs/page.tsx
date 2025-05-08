// 'use client';

// import FilterList from '@/components/common/filter/FilterList';
// import PrivateJobList from './PrivateJobList';
// import Image from 'next/image';
// import Loading from '@/app/loading';
// import { useSearchParams } from 'next/navigation';
// // import { useFilterJobs } from '@/hooks/useFilterJobs';

// export default function PrivateJobsPage() {
//   // searchParams가 Promise이므로 await 필요
//   const searchParams = useSearchParams();
//   const searchKeyword = searchParams.get('search_keyword'); // .get() 사용
//   // const { data, loading } = useFilterJobs('일반', searchKeyword || undefined);
//   // console.log('데이터 확인', data);

//   return (
//     <div className='flex h-full justify-center pt-30'>
//       <main className='w-full max-w-[1400px] flex-row'>
//         <h1 className='text-center text-3xl font-bold'>일반채용 정보</h1>
//         <hr />
//         <div className='bg-white'>
//           <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
//           <div className='mb-10 flex space-x-2'>
//             <FilterList />
//           </div>
//         </div>
//         {loading ? (
//           <Loading />
//         ) : data && data.data.length > 0 ? (
//           <PrivateJobList data={data} />
//         ) : (
//           <div className='flex flex-col items-center justify-center'>
//             <Image src='/SadCharacter1.png' alt='슬픈곰돌이 여' width={200} height={200} />
//             <div>검색 결과가 없습니다.</div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
