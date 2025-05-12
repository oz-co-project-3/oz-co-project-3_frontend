'use client';

import { Loader2 } from 'lucide-react';

export default function Loading({
  text = '로딩 중입니다...',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-gray-500 ${className}`}>
      <Loader2 className='text-main-light mb-4 h-8 w-8 animate-spin' />
      <span className='text-lg font-medium'>{text}</span>
    </div>
  );
}
