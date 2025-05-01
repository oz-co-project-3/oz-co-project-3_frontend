'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutUser } from '@/api/user';
import { useRouter } from 'next/navigation';

const userNavItems = [
  { name: '공공 공고', href: '/public-jobs' },
  { name: '일반 공고', href: '/private-jobs' },
  { name: '커뮤니티', href: '/community' },
  { name: 'ADMIN', href: '/admin' }, // 임시
];

//관리자용
const adminNavItems = [
  { name: '회원 관리', href: '/admin/user' },
  { name: '공고 관리', href: '/admin/jobs' },
  { name: '챗봇 관리', href: '/admin/chatbot' },
  { name: '커뮤니티 관리', href: '/admin/community' },
];

export default function Header() {
  const pathname = usePathname();
  const { accessToken, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      router.push('/');
    } catch (err) {
      console.error('❌ 로그아웃 실패:', err);
      alert('로그아웃에 실패했습니다.');
    }
  };

  //경로가 /admin 시작일때 관리자메뉴
  const isAdminPage = pathname.startsWith('/admin');
  const navItems = isAdminPage ? adminNavItems : userNavItems;

  return (
    <header className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-b bg-white px-2'>
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
        {accessToken ? (
          <>
            <Link href='/dashboard/profile'>
              <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                개인
              </Button>
            </Link>
            <Link href='/company-dashboard/profile'>
              <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                기업
              </Button>
            </Link>
            <Button
              variant='outline'
              onClick={handleLogout}
              className='cursor-pointer bg-amber-600 text-white hover:bg-amber-800'
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Link href='/user/login'>
              <Button className='bg-main hover:bg-main-light cursor-pointer text-white'>
                로그인
              </Button>
            </Link>
            <Link href='/user/register'>
              <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                회원가입
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

// 유저가 관리자일 경우 nav 조건부 렌더링
// 로그인 상태에 따라 버튼 조건부 렌더링
