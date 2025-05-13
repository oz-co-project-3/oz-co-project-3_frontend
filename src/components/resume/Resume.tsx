import { ResumeResponse } from '@/types/Schema/resumeSchema';
import { format } from 'date-fns';
import {
  BookCheck,
  Briefcase,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  User,
} from 'lucide-react';
import Image from 'next/image';

export default async function Resume({ resume }: { resume: ResumeResponse }) {
  return (
    <article className='flex flex-col gap-8 rounded-md'>
      <div className='flex items-center justify-between rounded-md border px-8 py-6'>
        <div className='flex flex-col gap-4'>
          <span className='text-xl font-bold text-zinc-800'>{resume.title}</span>
          <div className='flex gap-2'>
            <span className='rounded-lg bg-zinc-100 px-3 py-1 text-zinc-800'>{resume.status}</span>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <span className='text-zinc-800'>작성일: {format(resume.created_at, 'yyyy-MM-dd')}</span>
          <span className='text-zinc-800'>수정일: {format(resume.updated_at, 'yyyy-MM-dd')}</span>
        </div>
      </div>

      {/* 사진, 기본정보 */}
      <div className='flex justify-between gap-8 max-sm:flex-col'>
        <div className='relative aspect-[7/9] w-full max-w-[300px]'>
          {/* 프로필 이미지 */}
          <Image
            src={resume.image_url ? resume.image_url : '/Character2.png'}
            alt='profile'
            fill
            unoptimized
            className={`rounded-md object-contain ${resume.image_url ? '' : 'border'}`}
          />
        </div>
        <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <User className='size-4' />
              <span>이름</span>
            </h3>
            <span className='text-zinc-800'>{resume.name}</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Phone className='size-4' />
              <span>전화번호</span>
            </h3>
            <span className='text-zinc-800'>{resume.phone_number}</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Mail className='size-4' />
              <span>이메일</span>
            </h3>
            <span className='text-zinc-800'>{resume.email}</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Briefcase className='size-4' />
              <span>희망 직종</span>
            </h3>
            <span className='text-zinc-800'>{resume.interests}</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <MapPin className='size-4' />
              <span>희망 지역</span>
            </h3>
            <span className='text-zinc-800'>{resume.desired_area}</span>
          </div>
        </div>
      </div>

      {/* 경력, 학력 */}
      <div className='flex flex-col gap-8 rounded-md border p-4 sm:p-8 md:p-12'>
        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <BookCheck className='size-5 pt-1.5' />
            <span>경력</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            {resume.work_experiences.length > 0 ? (
              resume.work_experiences.map((experience) => (
                <div key={experience.id} className='flex justify-between text-zinc-800'>
                  <span>{experience.period}</span>
                  <span>{experience.position}</span>
                  <span>{experience.company}</span>
                </div>
              ))
            ) : (
              <div className='flex justify-end text-zinc-800'>
                <span>경력 이력이 없습니다.</span>
              </div>
            )}
          </div>
        </div>

        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <GraduationCap className='size-5 pt-1.5' />
            <span>최종 학력</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>{resume.education}</span>
              <span>{resume.school_name}</span>
              <span>{resume.graduation_status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8 rounded-md border p-4 sm:p-8 md:p-12'>
        <div className='flex items-center justify-between'>
          <h3 className='flex items-center gap-4 text-lg font-bold'>
            <Link className='size-4' />
            <span>포트폴리오 주소</span>
          </h3>
          <span className='text-zinc-800'>{resume.document_url}</span>
        </div>
      </div>

      {/* 자기소개 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-bold'>
          <PencilLine className='size-4' />
          <span>자기소개</span>
        </h3>
        <pre className='w-full whitespace-pre-wrap text-zinc-800'>{resume.introduce}</pre>
      </div>
    </article>
  );
}
