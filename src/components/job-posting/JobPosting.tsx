import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import {
  BookCheck,
  Briefcase,
  Calendar,
  CircleDollarSign,
  Clock,
  FileStack,
  FolderOpen,
  GraduationCap,
  Info,
  MapPin,
  PencilLine,
  UsersRound,
} from 'lucide-react';
import { format } from 'date-fns';
import JobPostingViewerLoader from './JobPostingViewerLoader';
import Map from '../map/map';

export default async function JobPosting({ jobPosting }: { jobPosting: JobPostingResponse }) {
  return (
    <article className='flex flex-col gap-4'>
      <div className='flex items-center justify-between border-b pb-4'>
        <h2 className='text-2xl font-bold'>{jobPosting.title}</h2>
        <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>
          {jobPosting.employment_type}
        </span>
      </div>

      <div className='flex items-center justify-between rounded-md border px-8 py-6'>
        <div className='flex flex-col gap-4'>
          <span className='text-xl font-bold text-zinc-800'>{jobPosting.company}</span>
          <div className='flex gap-2'>
            <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>
              {jobPosting.status}
            </span>
            <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>
              조회: {jobPosting.view_count}
            </span>
            <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>
              신고: {jobPosting.report}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <span className='text-zinc-800'>
            작성일:{' '}
            {jobPosting.created_at
              ? format(new Date(jobPosting.created_at), 'yyyy-MM-dd')
              : '등록일 없음'}
          </span>
          <span className='text-zinc-800'>
            수정일:{' '}
            {jobPosting.updated_at
              ? format(new Date(jobPosting.updated_at), 'yyyy-MM-dd')
              : '등록일 없음'}
          </span>
        </div>
      </div>

      {/* 모집 조건 */}
      <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light text-lg font-extrabold'>모집 조건</h3>

        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex flex-col gap-4 lg:w-1/2'>
            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Briefcase className='size-4' />
                <span>모집 직무</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.position}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <FolderOpen className='size-4' />
                <span>근무 형태</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.employ_method}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Calendar className='size-4' />
                <span>마감일</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.deadline}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <UsersRound className='size-4' />
                <span>모집 인원</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.recruitment_count}명</span>
            </div>
          </div>

          <div className='flex flex-col gap-4 lg:w-1/2'>
            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <BookCheck className='size-4' />
                <span>자격 요건</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.career}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <GraduationCap className='size-4' />
                <span>학력 요건</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.education}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <CircleDollarSign className='size-4' />
                <span>급여</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.salary}</span>
            </div>

            <div className='flex flex-col justify-between gap-4'>
              <h3 className='flex items-center gap-4 text-lg font-bold'>
                <Clock className='size-4' />
                <span>근무 시간</span>
              </h3>
              <span className='pl-8 text-zinc-800'>{jobPosting.work_time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 회사 약력 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <FileStack className='size-4' />
          <span className='text-main-light'>회사 약력</span>
        </h3>
        <pre className='text-zinc-800'>{jobPosting.history}</pre>
      </div>

      {/* 주요 업무 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <Info className='size-4' />
          <span className='text-main-light'>주요 업무</span>
        </h3>
        <pre className='text-zinc-800'>{jobPosting.summary}</pre>
      </div>

      {/* 근무지 정보 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <MapPin className='size-4' />
          <span className='text-main-light'>근무지 정보</span>
        </h3>
        {/* 지도 */}
        <Map address={jobPosting.location} />
        <p className='text-zinc-800'>{jobPosting.location}</p>
      </div>

      {/* 상세 모집 내용 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-extrabold'>
          <PencilLine className='size-4' />
          <span className='text-main-light'>상세 모집 내용</span>
        </h3>
        <JobPostingViewerLoader content={jobPosting.description} />
      </div>
    </article>
  );
}
