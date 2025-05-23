'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// import { fetchOnClient } from '@/api/clientFetcher';
// import useSWR from 'swr';
// import { UserProfileResponse } from '@/types/user';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { useLoginModalStore } from '@/store/useLoginModalStore'; // 이거까지 포함 해야함~
import LoginRequiredModal from '@/components/common/modals/LoginRequiredModal';
import { useEffect } from 'react';
import { businessNavItems } from '@/constants/nav';
import { seekerNavItems } from '@/constants/nav';
import Loading from '@/components/common/Loading';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();
  const { open } = useLoginModalStore();

  // const { data: profile } = useSWR<UserProfileResponse | null>(
  //   user ? '/api/user/profile/' : null,
  //   fetchOnClient,
  // );
  const isBusiness = user?.user_type?.includes('business');

  useEffect(() => {
    if (!user) {
      router.push('/user/login');
      open();
    }
  }, [user, open, router]);

  if (!user) {
    return <Loading />;
  }

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto'>
      <LoginRequiredModal />
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] gap-4 py-6'>
          <nav className='flex flex-col justify-between rounded bg-white px-4 py-8 max-sm:hidden sm:w-40 md:w-60'>
            <ul className='flex flex-col gap-2'>
              {seekerNavItems.map((item) => (
                <li key={item.name} className='w-full'>
                  <Link
                    href={item.href}
                    className={`${pathname.includes(item.href) ? 'text-main-light font-bold' : ''} hover:bg-background-ivory block w-full rounded-md px-4 py-4 text-xl`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {isBusiness && (
                <>
                  {/* hr 대신 쓸거 없나 */}
                  <hr className='my-4' />
                  {businessNavItems.map((item) => (
                    <li key={item.name} className='w-full'>
                      <Link
                        href={item.href}
                        className={`${pathname.includes(item.href) ? 'text-main-light font-bold' : ''} hover:bg-background-ivory block w-full rounded-md px-4 py-4 text-xl`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>

            {/* 기업 회원 업그레이드 버튼 */}
            {/* 임시 주소로 보냄 (기업회원 업그레이드 페이지 미구현) */}
            {/* 일단 보이게 해놨음, 밑에줄 앞에 ! 붙이기 */}
            {!isBusiness && (
              <Button
                onClick={() => router.push('/user/register-company')}
                className='bg-main-light hover:bg-main-dark cursor-pointer text-white'
              >
                기업 회원 업그레이드
              </Button>
            )}
          </nav>

          <div className='flex flex-1 flex-col gap-4 rounded-md bg-white shadow shadow-zinc-200 lg:min-h-[850px]'>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
