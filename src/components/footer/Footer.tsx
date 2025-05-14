import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-zinc-100 px-20 py-12'>
      <div className='mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-16 max-md:items-start max-md:gap-8 md:flex-row'>
        <div className='flex grow flex-col justify-start gap-1 pb-8'>
          <h4 className='mb-4 font-bold text-zinc-500'>시니어내일</h4>
          <span className='w-auto text-xs text-zinc-400'>
            © 2025 시니어내일 All rights reserved.
          </span>
        </div>

        <div className='flex flex-col gap-1 text-xs text-zinc-400'>
          <p>대표: 홍길동</p>
          <p>사업자등록번호: 123-45-67890</p>
          <p>통신판매업신고번호: 제2023-서울강남-1234호</p>
          <p>직업정보제공사업 신고번호: J1234567890123</p>
        </div>

        <div className='flex flex-col gap-1 text-xs text-zinc-400'>
          <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
          <p>고객센터: 02-123-4567 (평일 09:00-18:00, 주말·공휴일 휴무)</p>
          <p>이메일: help@seniorjob.co.kr</p>
          <Link href='/company-profile' className='underline hover:underline'>
            회사 소개
          </Link>
        </div>
      </div>
    </footer>
  );
}
