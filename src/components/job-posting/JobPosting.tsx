import fetchOnServer from '@/api/serverFetcher';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import {
  BookCheck,
  Briefcase,
  Calendar,
  CircleDollarSign,
  Info,
  MapPin,
  PencilLine,
  UsersRound,
} from 'lucide-react';

export default async function JobPosting({ id }: { id: string }) {
  console.log(id);
  const jobPosting = await fetchOnServer<JobPostingResponse>(`/api/job_posting/${id}/`);
  console.log(jobPosting);

  return (
    <article className='flex flex-col gap-8'>
      <h2 className='border-b pb-4 text-2xl font-bold'>공고 제목</h2>

      {/* 모집 조건 */}
      <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light text-lg font-extrabold'>모집 조건</h3>

        <div className='flex flex-col gap-4 lg:flex-row lg:gap-48'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Briefcase className='size-4' />
                <span>모집 직무</span>
              </h3>
              <span className='pl-8 text-zinc-800'>프론트엔드</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Calendar className='size-4' />
                <span>근무 형태</span>
              </h3>
              <span className='pl-8 text-zinc-800'>정규직</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <BookCheck className='size-4' />
                <span>자격 요건</span>
              </h3>
              <span className='pl-8 text-zinc-800'>
                프론트엔드 개발자 경력 2년 이상
                <br />
                React, TypeScript, Next.js 경험
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Calendar className='size-4' />
                <span>마감일</span>
              </h3>
              <span className='pl-8 text-zinc-800'>2025-05-01</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <UsersRound className='size-4' />
                <span>모집 인원</span>
              </h3>
              <span className='pl-8 text-zinc-800'>0명</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <CircleDollarSign className='size-4' />
                <span>급여</span>
              </h3>
              <span className='pl-8 text-zinc-800'>면접 후 결정</span>
            </div>
          </div>
        </div>
      </div>

      {/* 근무 조건 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <Info className='size-4' />
          <span className='text-main-light'>근무 조건</span>
        </h3>
        <p className='text-zinc-800'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi natus culpa numquam quo
          sed nisi commodi vel labore harum tempore, fugiat velit minima officia possimus deleniti
          eaque! Excepturi, illum iste! Impedit fugiat incidunt officia aliquid, suscipit odio
          natus. Animi sapiente incidunt eveniet aliquam minus expedita? Consectetur labore ducimus
          animi, reiciendis fuga sed debitis doloribus dolorum voluptate explicabo sapiente dolores
          dicta? Architecto molestias ea, minus dolore facilis quos a vero eveniet fugiat quidem,
          quam error inventore illo laboriosam aut, reiciendis iste quis rerum ipsam. Ratione
          corrupti cumque incidunt neque cum veniam. Maiores, voluptatibus explicabo molestias
          sapiente numquam odio! Sapiente dignissimos sequi error nisi unde! Ut rem aperiam error
          saepe at sapiente nobis a, veniam non, ab tenetur voluptatum enim, deleniti numquam.
          Possimus doloremque ex assumenda harum repudiandae dignissimos doloribus eligendi aut
          obcaecati placeat distinctio, delectus commodi quia voluptatem voluptates exercitationem
          corrupti nesciunt.
        </p>
      </div>

      {/* 근무지 정보 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <MapPin className='size-4' />
          <span className='text-main-light'>근무지 정보</span>
        </h3>
        <div className='flex h-60 items-center justify-center rounded-md border'>지도</div>
        <p className='text-zinc-800'>서울시 강남구 ㅁㄴㄹㅇ로 123-456</p>
      </div>

      {/* 상세 모집 내용 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <PencilLine className='size-4' />
          <span className='text-main-light'>상세 모집 내용</span>
        </h3>
        <div className='flex h-80 items-center justify-center rounded-md border'>
          텍스트 에디터로 들어가는 글 또는 이미지
        </div>
        <div className='flex h-80 items-center justify-center rounded-md border'>
          텍스트 에디터로 들어가는 글 또는 이미지
        </div>
        <div className='flex h-80 items-center justify-center rounded-md border'>
          텍스트 에디터로 들어가는 글 또는 이미지
        </div>
      </div>
    </article>
  );
}
