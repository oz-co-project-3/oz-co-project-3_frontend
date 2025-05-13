'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useLoginModalStore } from '@/store/useLoginModalStore';
import {
  isValidElement,
  cloneElement,
  ReactNode,
  MouseEvent,
} from 'react';

interface LoginGuardProps {
  children: ReactNode;
}

type ChildProps = {
  onClick?: (e: MouseEvent) => void;
  className?: string;
};

export default function LoginGuard({ children }: LoginGuardProps) {
  const { user } = useAuthStore();
  const { open, setRedirectPath } = useLoginModalStore();

  const handleGuardClick = (originalOnClick?: (e: MouseEvent) => void) => {
    return (e: MouseEvent) => {
      if (!user) {
        e.preventDefault();
        e.stopPropagation();
        setRedirectPath('/user/login');
        open();
        return;
      }

      // 로그인 되어 있으면 원래 클릭 실행
      originalOnClick?.(e);
    };
  };

  if (isValidElement<ChildProps>(children)) {
    const originalOnClick = children.props.onClick;
    const mergedClassName = `${children.props.className ?? ''} ${
      !user ? 'cursor-pointer' : ''
    }`;

    return cloneElement(children, {
      onClick: handleGuardClick(originalOnClick),
      className: mergedClassName,
    });
  }

  return children;
}
