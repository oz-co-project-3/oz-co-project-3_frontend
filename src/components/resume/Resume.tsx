import { ResumeResponse } from '@/types/Schema/resumeSchema';
import { format } from 'date-fns';
import {
  BookCheck,
  Briefcase,
  // Calendar,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  User,
  // Hammer,
  // Languages,
  // Medal,
  // TicketCheck,
} from 'lucide-react';
import Image from 'next/image';

export default async function Resume({ resume }: { resume: ResumeResponse }) {
  // const user = await fetchOnServer<UserResponse>(`/api/user/profile/${resume.user.id}/`);
  // 유저 정보 받아서, 생년월일 넣어주기?

  // console.log(resume);
  console.log(resume.created_at, resume.updated_at);

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
          {/* <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Calendar className='size-4' />
              <span>생년월일</span>
            </h3>
            <span className='text-zinc-800'>생년월일 이력서 폼에 없음!</span>
          </div> */}
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

      {/* 스킬, 수상, 언어 */}
      {/* <div className='flex flex-col gap-8 rounded-md border p-4 sm:p-8 md:p-12'>
        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <Hammer className='size-5 pt-1.5' />
            <span>스킬</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>프론트엔드</span>
              <span>Next.js, React, TypeScript, Tailwind CSS</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>백엔드</span>
              <span>Node.js, Express, PostgreSQL</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>데브옵스</span>
              <span>Docker, Kubernetes, CI/CD</span>
            </div>
          </div>
        </div>

        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <TicketCheck className='size-5 pt-1.5' />
            <span>자격증</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>정보처리 기사</span>
              <span>2020-03-01</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>토목기사</span>
              <span>1993-03-01</span>
            </div>
          </div>
        </div>

        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <Medal className='size-5 pt-1.5' />
            <span>수상</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>ㅇㅇㅇㅇ 대회</span>
              <span>ㅇㅇㅇㅇ상 수상</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>블라블라 대회</span>
              <span>어쩌구상 수상</span>
            </div>
          </div>
        </div>

        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/5 md:w-1/4 lg:w-[30%]'>
            <Languages className='size-5 pt-1.5' />
            <span>언어</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>영어</span>
              <span>비즈니스 회화 가능</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>스페인어</span>
              <span>일상 회화 가능</span>
            </div>
          </div>
        </div>
      </div> */}

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
