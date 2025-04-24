import Link from 'next/link';

export default async function ProfilePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <div className='flex items-center justify-between border-b pb-2'>
          <h2 className='text-2xl font-bold'>프로필</h2>
          <Link
            href='/dashboard/profile/edit'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-6 py-2 text-white'
          >
            회원정보 수정
          </Link>
        </div>

        <div className='flex flex-col gap-4 rounded-md border p-8'>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>이름</span>
            <span>김오즈</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>이메일</span>
            <span>oz-8-frontend@nextrunners.com</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>전화번호</span>
            <span>010-0000-0000</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>생년월일</span>
            <span>1960-01-01</span>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-md border p-8'>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>관심 분야</span>
            <span>프론트엔드, 백엔드, 데이터 분석가</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>지원한 공고 수</span>
            <span>10</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>찜한 공고 수</span>
            <span>10</span>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-md border p-8'>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>구직 상태</span>
            <span>구직 중</span>
          </div>
          <div className='flex justify-between border-b pb-4'>
            <span className='font-bold'>가입일</span>
            <span>2025-01-01</span>
          </div>
        </div>
      </section>
    </>
  );
}

// 프사 안하는지 물어보기
//

// 회원정보 수정 버튼 넣기
