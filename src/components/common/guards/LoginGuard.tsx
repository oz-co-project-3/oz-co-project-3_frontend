'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useLoginModalStore } from '@/store/useLoginModalStore';
import { ReactNode } from 'react';

interface LoginGuardProps {
  children: ReactNode;
}

export default function LoginGuard({ children }: LoginGuardProps) {
  const { user } = useAuthStore();
  const { open, setRedirectPath } = useLoginModalStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setRedirectPath('/user/login');
      open();
    }
  };

  return (
    <div onClick={handleClick} className={!user ? 'cursor-pointer' : ''}>
      {children}
    </div>
  );
}
