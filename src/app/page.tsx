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
import { UserProfileResponse } from '@/types/user';
import RecommendedJobCard from '@/components/job-posting/RecommendedJobCard';
import { PublicJobsResponse } from '@/types/publicJob';
import Image from 'next/image';

export default async function Home() {
  //일반
  const jobPosting = await fetchOnServer<JobPostingListResponse>('/api/postings/');
  const privateJobs = jobPosting.data.slice(0, 10);
  console.log('일반', privateJobs);

  //공공
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs/`);
  const publicJobs: PublicJobsResponse = await response.json();
  console.log('공공: ', publicJobs);

  const userData = await fetchOnServer<UserProfileResponse>('/api/user/profile/');
  console.log(userData);
  const IsLoggedIn = !!userData.seeker?.name;

  // const isSeoulPublic = userData.seeker?.interests.includes('서울시 공공 일자리');

  return (
    <>
      <main className='relative mx-auto max-w-[1200px] text-center'>
        {/* Hero 섹션 컨테이너 */}
        <div className='relative h-[750px]'>
          <div className='absolute top-0 right-1/2 left-1/2 z-0 -mr-[50vw] -ml-[50vw] h-full w-screen'>
            <Image
              src='/senior-bg.jpg'
              alt='main-image'
              fill
              draggable={false}
              unoptimized
              className='object-cover brightness-50'
            />
          </div>

          <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center'>
            <div className='flex flex-col items-center gap-12 md:gap-16'>
              <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold text-zinc-100 max-md:font-extrabold sm:text-2xl md:text-3xl lg:text-4xl'>
                  &quot;내일 뭐하지? 시니어내일에서 찾아봐요!&quot;
                </h2>
                <p className='text-sm text-zinc-200 md:text-base lg:text-lg'>
                  경험과 가치를 이어가는 새로운 일자리 매칭
                  <br />
                  지금 바로 시작하세요!
                </p>
              </div>

              <div className='flex w-full max-w-2xl flex-col gap-2'>
                <SearchBarSuspense />
                <div className='mt-1 flex flex-row justify-center'>
                  <p className='mr-5 text-zinc-400 max-md:text-sm'>검색 키워드 추천</p>
                  <div className='flex justify-center'>
                    <Suspense fallback={<Loading />}>
                      <KeywordRecommand />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white pt-32 pb-48'>
          <div className='pb-6 text-lg font-bold md:text-xl lg:text-2xl'>주요 서비스</div>
          <nav className='mb-44 flex flex-row justify-center space-x-4 max-sm:space-x-2'>
            <Link href='/public-jobs?page=1'>
              <div className='flex h-[70px] w-[105px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[160px] lg:w-[240px] lg:gap-8'>
                <AiOutlineFileSearch className='text-[#2B90D9]' />
                <span className='text-base md:text-lg lg:text-xl'>공공 공고</span>
              </div>
            </Link>
            <Link href='/private-jobs'>
              <div className='flex h-[70px] w-[105px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[160px] lg:w-[240px] lg:gap-8'>
                <MdOutlineWorkOutline className='text-[#22C55E]' />
                <span className='text-base md:text-lg lg:text-xl'>일반 공고</span>
              </div>
            </Link>
            <Link href='/dashboard'>
              <div className='flex h-[70px] w-[105px] flex-col gap-2 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100 md:h-[100px] md:w-[150px] md:gap-4 lg:h-[160px] lg:w-[240px] lg:gap-8'>
                <VscAccount className='text-[#A881AF]' />
                <span className='text-base md:text-lg lg:text-xl'>이력서</span>
              </div>
            </Link>
          </nav>

          {/* 추천 공고 (로그인 시) */}
          {IsLoggedIn ? (
            <>
              <h3 className='pb-8 text-lg font-bold md:text-xl lg:text-2xl'>추천 공고</h3>
              <Carousel
                opts={{ align: 'center' }}
                className='mx-auto flex w-full px-4 sm:px-8 md:px-12 lg:px-16'
              >
                <CarouselContent>
                  {privateJobs.map((job) => (
                    <CarouselItem
                      key={job.id}
                      className='basis-full transition-all duration-150 hover:scale-105 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
                    >
                      <RecommendedJobCard
                        jobPosting={job} // 일반공고 타입에 맞게 전달
                        // userData={userData}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          ) : null}

          <h3 className='mt-28 pb-8 text-lg font-bold md:text-xl lg:text-2xl'>
            최근에 등록된 공고
          </h3>
          <Carousel
            opts={{
              align: 'center',
            }}
            className='mx-auto flex w-full px-4 sm:px-8 md:px-12 lg:px-16'
          >
            <CarouselContent>
              {privateJobs.map((jobPosting) => (
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
        </div>
      </main>
    </>
  );
}
