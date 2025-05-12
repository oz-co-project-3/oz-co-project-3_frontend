'use client';

import { Skeleton } from '@/components/ui/skeleton';

type Variant = 'table' | 'card' | 'profile';

interface SkeletonPlaceholderProps {
  variant?: Variant;
  rows?: number;
  columns?: number;
  animated?: boolean;
  className?: string;
}

export default function SkeletonPlaceholder({
  variant = 'table',
  rows = 5,
  columns = 5,
  animated = true,
  className = '',
}: SkeletonPlaceholderProps) {
  const gridColsClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] || 'grid-cols-5';

  const animationClass = animated ? 'animate-pulse' : '';

  //카드형
  if (variant === 'card') {
    return (
      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${animationClass} ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className='flex flex-col gap-3 rounded-md border p-4 shadow-sm'>
            <Skeleton className='h-[180px] w-full rounded-md' />
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    );
  }

  //프로필용
  if (variant === 'profile') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${animationClass} ${className}`}>
        <Skeleton className='h-24 w-24 rounded-full' />
        <Skeleton className='h-5 w-40' />
        <Skeleton className='h-4 w-24' />
      </div>
    );
  }

  // 기본: 테이블 스켈레톤
  return (
    <div className={`space-y-4 py-10 ${animationClass} ${className}`}>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className={`grid gap-6 ${gridColsClass}`}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={colIdx} className='h-10 w-full' />
          ))}
        </div>
      ))}
    </div>
  );
}

// 사용방법 (예시)

// 테이블형(기본) <SkeletonPlaceholder rows={5} columns={4} />
// 카드형 <SkeletonPlaceholder variant="card" rows={6} />
// 프로필형 <SkeletonPlaceholder variant="profile" />

// 애니메이션 끄고 싶다면? <SkeletonPlaceholder variant="card" animated={false} />
