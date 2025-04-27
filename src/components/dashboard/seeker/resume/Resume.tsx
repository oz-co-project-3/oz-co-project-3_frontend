import {
  Briefcase,
  Calendar,
  GraduationCap,
  Hammer,
  Languages,
  Mail,
  MapPin,
  Medal,
  PencilLine,
  Phone,
  TicketCheck,
  User,
} from 'lucide-react';
import Image from 'next/image';

export default async function Resume() {
  // id나 이력서 객체를 인자로 받아오기

  return (
    <article className='flex flex-col gap-8 rounded-md'>
      {/* 사진, 기본정보 */}
      <div className='flex justify-between gap-8'>
        <div className='relative aspect-[7/9] w-full max-w-[300px] border'>
          {/* 디폴트 이미지 */}
          <Image src='/defaultProfile.png' alt='profile' fill className='object-cover p-12' />
        </div>
        <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <User className='size-4' />
              <span>이름</span>
            </h3>
            <span className='text-zinc-800'>김오즈</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Calendar className='size-4' />
              <span>생년월일</span>
            </h3>
            <span className='text-zinc-800'>1990-01-01</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Phone className='size-4' />
              <span>전화번호</span>
            </h3>
            <span className='text-zinc-800'>010-1234-5678</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <Mail className='size-4' />
              <span>이메일</span>
            </h3>
            <span className='text-zinc-800'>oz-co-project-08@nextrunners.com</span>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-4 text-lg font-bold'>
              <MapPin className='size-4' />
              <span>주소</span>
            </h3>
            <span className='text-zinc-800'>서울특별시 강남구 ㅁㄴㅇㄹ로 123-456</span>
          </div>
        </div>
      </div>

      {/* 경력, 학력 */}
      <div className='flex flex-col gap-8 rounded-md border p-4 sm:p-8 md:p-12'>
        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
            <Briefcase className='size-5 pt-1.5' />
            <span>경력</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>2020-03-01 ~ 2024-02-28</span>
              <span>asdf 프론트엔드 개발자 (팀장)</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>2015-03-01 ~ 2019-02-28</span>
              <span>**소프트 프론트엔드 개발자 (과장)</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>2015-03-01 ~ 2019-02-28</span>
              <span>ㅁㄴㅇㄹ 프론트엔드 개발자 (대리)</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>1993-03-01 ~ 1999-11-30</span>
              <span>넥스트러너스 프론트엔드 개발자 (사원)</span>
            </div>
          </div>
        </div>

        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
            <GraduationCap className='size-5 pt-1.5' />
            <span>학력</span>
          </h3>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex justify-between text-zinc-800'>
              <span>1991-03-01 ~ 1993-02-28</span>
              <span>ㅁㅁ대학교 대학원 사회환경공학과 졸업</span>
            </div>
            <div className='flex justify-between text-zinc-800'>
              <span>1985-03-01 ~ 1991-02-28</span>
              <span>ㅁㅁ대학교 사회환경공학부 졸업</span>
            </div>
          </div>
        </div>
      </div>

      {/* 스킬, 수상, 언어 */}
      <div className='flex flex-col gap-8 rounded-md border p-4 sm:p-8 md:p-12'>
        <div className='sm:flex'>
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
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
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
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
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
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
          <h3 className='flex gap-4 text-lg font-bold sm:w-1/6 md:w-1/5 lg:w-1/4'>
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
      </div>

      {/* 자기소개 */}
      <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
        <h3 className='flex items-center gap-4 text-lg font-bold'>
          <PencilLine className='size-4' />
          <span>자기소개</span>
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
          corrupti nesciunt. Necessitatibus, corporis maiores! Qui libero soluta animi enim id! Quam
          ut at placeat aut quisquam dolorum, et velit similique unde alias repellat distinctio
          totam, aliquid iusto. Neque provident at eveniet, consequatur rem placeat eos quas velit
          iste, officiis sint. Iure eveniet cum voluptatibus sequi ex asperiores earum, totam
          excepturi quaerat ipsam omnis aliquam aperiam, laudantium blanditiis maiores. Repellat
          nesciunt dolorem, cumque reprehenderit asperiores obcaecati quod alias rerum quia porro!
          Consectetur omnis molestias nulla, ea officia perferendis suscipit sint fugit. Inventore
          esse illo culpa ipsam recusandae quibusdam veritatis. Repudiandae, deserunt! Cumque
          accusamus repudiandae saepe, ipsam deleniti doloremque excepturi doloribus error.
          Aspernatur quae itaque iure hic eaque provident quia sapiente, voluptate fugiat vero
          veniam eligendi qui at repellendus, aliquid eius, consequuntur necessitatibus consequatur
          ea laudantium saepe! Error at distinctio totam ad! Eaque, suscipit temporibus ratione
          autem amet totam distinctio minus natus, delectus porro id dignissimos commodi. Saepe
          inventore delectus accusantium debitis voluptate deserunt nisi iste commodi fugiat!
          Repudiandae ut quaerat hic?
        </p>
      </div>
    </article>
  );
}
