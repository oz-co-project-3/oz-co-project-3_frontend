import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between bg-white px-4'>
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
          <li>
            <Link href='/'>공공 공고</Link>
          </li>
          <li>
            <Link href='/'>일반 공고</Link>
          </li>
          <li>
            <Link href='/'>커뮤니티</Link>
          </li>
        </ul>
      </nav>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Button variant='outline'>로그인</Button>
        </Link>
        <Link href='/'>
          <Button>회원가입</Button>
        </Link>
      </div>
    </header>
  );
}
