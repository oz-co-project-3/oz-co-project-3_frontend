'use client';

import { ChevronLeft, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { UserProfileResponse } from '@/types/user';
import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import { useAuthStore } from '@/store/useAuthStore';
import { businessNavItems, seekerNavItems } from '@/constants/nav';
import { logoutUser } from '@/api/user';

export default function MobileTopBar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const { data: profile } = useSWR<UserProfileResponse | null>(
    user ? '/api/user/profile/' : null,
    fetchOnClient,
  );
  const isBusiness = profile?.base.user_type?.includes('business');

  const handleLogout = async () => {
    try {
      logout(); // Zustand 상태 초기화
      await logoutUser();
      router.push('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <div className='fixed top-0 right-0 left-0 z-1000 flex h-[70px] items-center justify-between border-b bg-white px-4 sm:hidden'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => router.back()}
        className='cursor-pointer'
      >
        <ChevronLeft />
      </Button>

      <h1 className='h-[70px] w-[150px]'>
        <Link href='/' className='relative block h-full w-full'>
          <Image
            src='/logo/logo.gif'
            alt='시니어내일'
            fill
            sizes='150px'
            priority={true}
            draggable={false}
            className='object-cover'
          />
        </Link>
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger className='cursor-pointer'>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='z-2000 p-2'>
          {/* 로그아웃 상태 */}
          {!profile && (
            <>
              <DropdownMenuItem className='cursor-pointer'>
                <Link href='/user/login' className='p-1 text-base'>
                  로그인
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                <Link href='/user/register' className='p-1 text-base'>
                  회원가입
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {/* 로그인 상태 */}
          {profile &&
            seekerNavItems.map((item) => (
              <DropdownMenuItem key={item.name} className='cursor-pointer'>
                <Link href={item.href} className='p-1 text-base'>
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}

          {/* 비즈니스 유저 로그인 상태 */}
          {isBusiness && (
            <>
              <DropdownMenuSeparator />
              {businessNavItems.map((item) => (
                <DropdownMenuItem key={item.name} className='cursor-pointer'>
                  <Link href={item.href} className='p-1 text-base'>
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}

          {/* 로그인 상태 */}
          {profile && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='p-0'>
                <Link href='/' className='w-full'>
                  <Button
                    variant='outline'
                    onClick={handleLogout}
                    className='bg-danger w-full cursor-pointer text-white hover:bg-amber-700 hover:text-white'
                  >
                    로그아웃
                  </Button>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
