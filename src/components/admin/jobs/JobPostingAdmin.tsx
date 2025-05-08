'use client';

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
import JobPostingViewer from '@/components/common/text-editor/JobPostingViewer';
import useJobPosting from '@/hooks/useJobPosting';
import JobPostingActionPanel from './JobPostingActionPanel';

interface Props {
  id: string;
}

export default function JobPostingAdmin({ id }: Props) {
  const { jobPosting, loading, error } = useJobPosting(id);

  if (error) return null;
  if (loading || !jobPosting) return <p className='text-gray-400'>로딩 중...</p>;

  return (
    <article className='flex flex-col gap-4'>
      {/* 승인/반려 */}
      <JobPostingActionPanel id={id} status={jobPosting.status} />

      {/* 공고 제목 */}
      <div className='flex items-center justify-between border-b pb-4'>
        <h2 className='text-2xl font-bold'>{jobPosting.title}</h2>
        <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>
          {jobPosting.employment_type}
        </span>
      </div>

      {/* 회사 및 기본정보 */}
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
          {/* <span className='text-zinc-800'>
            작성일:{' '}
            {jobPosting.created_at && isValid(parseISO(jobPosting.created_at))
              ? format(parseISO(jobPosting.created_at), 'yyyy-MM-dd')
              : '날짜 없음'}
          </span>

          <span className='text-zinc-800'>
            수정일:{' '}
            {isValid(parseISO(jobPosting.updated_at))
              ? format(parseISO(jobPosting.updated_at), 'yyyy-MM-dd')
              : '날짜 없음'}
          </span> */}
        </div>
      </div>

      {/* 모집 조건 */}
      <div className='flex flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light text-lg font-extrabold'>모집 조건</h3>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex flex-col gap-4 lg:w-1/2'>
            <div className='flex items-center gap-4'>
              <Briefcase className='size-4' />
              <span>모집 직무: {jobPosting.position}</span>
            </div>
            <div className='flex items-center gap-4'>
              <FolderOpen className='size-4' />
              <span>근무 형태: {jobPosting.employ_method}</span>
            </div>
            <div className='flex items-center gap-4'>
              <Calendar className='size-4' />
              <span>마감일: {jobPosting.deadline}</span>
            </div>
            <div className='flex items-center gap-4'>
              <UsersRound className='size-4' />
              <span>모집 인원: {jobPosting.recruitment_count}명</span>
            </div>
          </div>

          <div className='flex flex-col gap-4 lg:w-1/2'>
            <div className='flex items-center gap-4'>
              <BookCheck className='size-4' />
              <span>자격 요건: {jobPosting.career}</span>
            </div>
            <div className='flex items-center gap-4'>
              <GraduationCap className='size-4' />
              <span>학력 요건: {jobPosting.education}</span>
            </div>
            <div className='flex items-center gap-4'>
              <CircleDollarSign className='size-4' />
              <span>급여: {jobPosting.salary}</span>
            </div>
            <div className='flex items-center gap-4'>
              <Clock className='size-4' />
              <span>근무 시간: {jobPosting.work_time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 회사 약력 */}
      <div className='rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light flex items-center gap-4 text-lg font-bold'>
          <FileStack className='size-4' /> 회사 약력
        </h3>
        <pre className='whitespace-pre-wrap text-zinc-800'>{jobPosting.history}</pre>
      </div>

      {/* 주요 업무 */}
      <div className='rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light flex items-center gap-4 text-lg font-bold'>
          <Info className='size-4' /> 주요 업무
        </h3>
        <pre className='whitespace-pre-wrap text-zinc-800'>{jobPosting.summary}</pre>
      </div>

      {/* 근무지 정보 */}
      <div className='rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light flex items-center gap-4 text-lg font-bold'>
          <MapPin className='size-4' /> 근무지 정보
        </h3>
        <div className='flex h-60 items-center justify-center rounded-md border'>지도</div>
        <p className='text-zinc-800'>{jobPosting.location}</p>
      </div>

      {/* 상세 모집 내용 */}
      <div className='rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='text-main-light flex items-center gap-4 text-lg font-bold'>
          <PencilLine className='size-4' /> 상세 모집 내용
        </h3>
        <JobPostingViewer content={jobPosting.description} />
      </div>
    </article>
  );
}
