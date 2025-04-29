'use client';

import { Button } from '@/components/ui/button';

export default function TogleButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      size='sm'
      className={`${isActive ? 'bg-main-light hover:bg-main-dark' : 'bg-zinc-200 text-black hover:bg-zinc-300'}`}
    >
      {children}
    </Button>
  );
}
