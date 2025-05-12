import ScrollShowSearchBar from '@/components/common/searchbar/ScrollShowSearchbar';
import SearchBarSuspense from '@/components/common/searchbar/Searchbar';
import Link from 'next/link';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import KeywordRecommand from '@/components/common/searchbar/KeywordRecommand';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Suspense } from 'react';
import Loading from './(main)/loading';
import RecentPostingsCard from '@/components/job-posting/RecentPostingsCard';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';
import fetchOnServer from '@/api/serverFetcher';
// import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
// import JobPostingCard from '@/components/job-posting/JobPostingCard';

export default async function Home() {
  const jobPostings = await fetchOnServer<JobPostingListResponse>('/api/postings/');
  const recentJobPostings = jobPostings.data.slice(0, 10);
  console.log(jobPostings);

  return (
    <>
      <ScrollShowSearchBar />
      <main className='mx-auto max-w-[1200px] flex-row py-48 text-center'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-bold max-md:font-extrabold sm:text-2xl md:text-3xl lg:text-4xl'>
            &quot;내일 뭐하지? 시니어내일에서 찾아봐요!&quot;
          </h2>
          <p className='text-sm text-zinc-900 md:text-base lg:text-lg'>
            경험과 가치를 이어가는 새로운 일자리 매칭
            <br />
            지금 바로 시작하세요!
          </p>
        </div>

        <div className='flex flex-col gap-2 pt-34'>
          <SearchBarSuspense />
          <div className='mt-1 mb-12 flex flex-row justify-center'>
            <p className='mr-5 text-gray-500 max-md:text-sm'>검색 키워드 추천</p>
            <div className='mb-4 flex justify-center'>
              <Suspense fallback={<Loading />}>
                <KeywordRecommand />
              </Suspense>
            </div>
          </div>
        </div>

        <nav className='mb-44 flex flex-row justify-center space-x-4'>
          <Link href='/public-jobs'>
            <div className='flex h-[60px] w-[80px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 sm:h-[80px] sm:w-[120px] sm:gap-3 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[120px] lg:w-[180px] lg:gap-5'>
              <AiOutlineFileSearch className='text-[#2B90D9]' />
              <span className='text-sm sm:text-base md:text-lg lg:text-xl'>공공 공고</span>
            </div>
          </Link>
          <Link href='/private-jobs'>
            <div className='flex h-[60px] w-[80px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 sm:h-[80px] sm:w-[120px] sm:gap-3 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[120px] lg:w-[180px] lg:gap-5'>
              <MdOutlineWorkOutline className='text-[#22C55E]' />
              <span className='text-sm sm:text-base md:text-lg lg:text-xl'>일반 공고</span>
            </div>
          </Link>
          <Link href='/dashboard'>
            <div className='flex h-[60px] w-[80px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 sm:h-[80px] sm:w-[120px] sm:gap-3 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[120px] lg:w-[180px] lg:gap-5'>
              <VscAccount className='text-[#A881AF]' />
              <span className='text-sm sm:text-base md:text-lg lg:text-xl'>이력서</span>
            </div>
          </Link>
        </nav>

        {/* 로그인되면 추천 공고 뜨게 해야함 */}
        <h3 className='pb-8 text-2xl font-bold'>최근에 등록된 공고</h3>
        <Carousel
          opts={{
            align: 'center',
          }}
          className='mx-auto flex w-full px-4 sm:px-8 md:px-12 lg:px-16'
        >
          <CarouselContent className='w-full'>
            {recentJobPostings.map((jobPosting) => (
              <CarouselItem
                key={jobPosting.id}
                className='basis-full transition-all duration-150 hover:scale-105 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <RecentPostingsCard jobPosting={jobPosting} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </>
  );
}
