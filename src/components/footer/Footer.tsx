import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt-auto bg-zinc-100 p-6'>
      <div className='container mx-auto'>
        <div className='mb-4 flex items-center justify-between border-b pb-4'>
          <h2 className='text-lg font-bold text-zinc-800'>시니어내일</h2>
        </div>

        <div className='grid grid-cols-1 gap-4 text-sm text-zinc-600 md:grid-cols-2'>
          <div>
            <p className='mb-1'>대표: 홍길동</p>
            <p className='mb-1'>사업자등록번호: 123-45-67890</p>
            <p className='mb-1'>통신판매업신고번호: 제2023-서울강남-1234호</p>
            <p className='mb-1'>직업정보제공사업 신고번호: J1234567890123</p>
          </div>
          <div>
            <p className='mb-1'>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
            <p className='mb-1'>고객센터: 02-123-4567 (평일 09:00-18:00, 주말·공휴일 휴무)</p>
            <p className='mb-1'>이메일: help@seniorjob.co.kr</p>
            <Link href='/company-profile' className='text-blue-600 hover:underline'>
              회사 소개
            </Link>
          </div>
        </div>

        <div className='mt-6 text-center text-xs text-zinc-500'>
          <p>© 2025 시니어내일 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
