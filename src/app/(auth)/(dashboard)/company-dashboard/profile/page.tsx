import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function CompanyProfilePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>기업 프로필</h2>
          {/* 컴포넌트 분리 (클라이언트 컴포넌트) */}
          <div className='flex gap-2'>
            <Button className='bg-danger cursor-pointer hover:bg-amber-700'>회원 탈퇴</Button>
            <Link
              href='/company-dashboard/profile/edit'
              className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
            >
              회사 정보 수정
            </Link>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-md border p-8'>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>회사명</span>
            <span>넥스트러너스</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>사업자 등록 번호</span>
            <span>000-00-00000</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>회사 개업일</span>
            <span>2025-01-01</span>
          </div>
          <div className='flex flex-col gap-2 border-b pb-4'>
            <span className='font-bold'>회사 소개</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut culpa, natus
              repellendus voluptatem architecto consequatur obcaecati adipisci pariatur error
              accusantium aliquid ipsa quaerat, possimus, non alias ullam. Hic, iure. Consequatur
              impedit atque blanditiis maxime at? Ea ducimus voluptas odio consequatur aspernatur,
              quam nulla provident sit perspiciatis culpa velit et facere deleniti beatae atque id,
              saepe exercitationem laudantium at pariatur? Vitae doloremque autem mollitia quia
              maxime odit omnis? Vel, culpa quasi, nobis ipsam explicabo impedit fuga iste atque
              architecto modi sequi deserunt illo numquam. Fugit ex id quod quia minus. Eaque quo
              tempora quam debitis. Beatae reprehenderit aut quae, sunt a odit quod fuga molestiae
              dolorem suscipit architecto laborum officiis recusandae at placeat, nulla soluta
              assumenda tempora excepturi alias fugiat. Voluptates eaque iste adipisci. Facilis
              eligendi ex ipsa, architecto repellat neque! Voluptate esse, officia nesciunt delectus
              laboriosam deleniti eveniet dolor error ratione, totam laudantium consequuntur,
              provident et! Fuga, voluptatibus corporis?
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-md border p-8'>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>담당자 이름</span>
            <span>김오즈</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>담당자 전화번호</span>
            <span>010-0000-0000</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>담당자 이메일</span>
            <span>oz-8-frontend@nextrunners.com</span>
          </div>
        </div>

        <div className='flex w-full gap-2'>
          <Link
            href='/company-dashboard/previous-job-postings'
            className='grow cursor-pointer rounded border py-2 text-center transition-all duration-150 hover:bg-zinc-100'
          >
            지난 채용공고
          </Link>
          <Link
            href='/company-dashboard/current-job-postings'
            className='grow cursor-pointer rounded border py-2 text-center transition-all duration-150 hover:bg-zinc-100'
          >
            현재 채용공고
          </Link>
        </div>

        {/* URL 확인 */}
        <Link
          href='/company-dashboard/job-postings/new'
          className='bg-main-light hover:bg-main-dark cursor-pointer rounded py-2 text-center text-white transition-all duration-150'
        >
          채용 공고 등록
        </Link>
      </section>
    </>
  );
}
