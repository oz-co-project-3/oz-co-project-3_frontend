'use client';

import { Button } from '@/components/ui/button';

export default function TogleButton({
  onClick,
  children,
  isActive,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      size='sm'
      className={`${isActive ? 'bg-main-light hover:bg-main-dark' : 'bg-transparent text-black shadow-none hover:bg-zinc-100'} cursor-pointer`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
