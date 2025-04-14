'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '공공 공고', href: '/public-jobs' },
  { name: '일반 공고', href: '/private-jobs' },
  { name: '커뮤니티', href: '/community' },
  { name: 'ADMIN', href: '/admin' }, // 임시
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between bg-white px-2'>
      <h1>
        <Link href='/'>
          <Image
            src='/logo/logo.gif'
            alt='시니어내일'
            width={150}
            height={50}
            priority={true}
            draggable={false}
          />
        </Link>
      </h1>
      <nav className='grow px-12'>
        <ul className='flex items-center gap-4'>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${pathname === item.href ? 'text-main-light font-bold' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='flex items-center gap-2'>
        {/* 유저 정보 받으면 원 안에 프사 넣은걸로 바꾸기 */}
        <Link href='/dashboard'>
          <Button className='bg-main-dark hover:bg-main-light cursor-pointer text-white'>MY</Button>
        </Link>
        {/* <Button variant='outline' onClick={logOut}>로그아웃</Button> */}
        <Link href='/user/login'>
          <Button className='bg-main hover:bg-main-light cursor-pointer text-white'>로그인</Button>
        </Link>
        <Link href='/user/register'>
          <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
            회원가입
          </Button>
        </Link>
      </div>
    </header>
  );
}

// 유저가 관리자일 경우 nav 조건부 렌더링
// 로그인 상태에 따라 버튼 조건부 렌더링
