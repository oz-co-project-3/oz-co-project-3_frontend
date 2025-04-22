'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '프로필', href: '/company-dashboard/profile' },
  { name: '현재 채용공고', href: '/company-dashboard/current-job-postings' },
  { name: '이전 채용공고', href: '/company-dashboard/previous-job-postings' },
];

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] gap-4 py-6'>
          <nav className='rounded bg-white px-4 py-8 sm:w-40 md:w-60'>
            <ul className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <li key={item.name} className='w-full'>
                  <Link
                    href={item.href}
                    className={`${pathname === item.href ? 'text-main-light font-bold' : ''} hover:bg-background-ivory block w-full rounded-md px-4 py-4 text-xl`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex flex-1 flex-col gap-4'>{children}</div>
        </div>
      </div>
    </main>
  );
}
