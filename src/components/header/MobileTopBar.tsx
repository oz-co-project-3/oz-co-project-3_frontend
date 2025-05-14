'use client';

import { ChevronLeft, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileTopBar() {
  const router = useRouter();

  return (
    <div className='bg-background-ivory fixed top-0 right-0 left-0 z-1000 flex h-[70px] items-center justify-between border-b px-4 sm:hidden'>
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
        <DropdownMenuContent className='z-2000'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
