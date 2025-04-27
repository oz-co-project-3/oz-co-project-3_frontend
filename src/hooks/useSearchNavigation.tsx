'use client';

import { useRouter, usePathname } from 'next/navigation';

// 검색 이동 로직을 커스텀 훅으로 분리
export function useSearchNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateWithSearch = (searchKeyword: string): void => {
    if (!searchKeyword) return;
    const targetPath = pathname === '/' ? '/all-jobs' : pathname;
    router.push(`${targetPath}?search_keyword=${encodeURIComponent(searchKeyword)}`);
  };

  return { navigateWithSearch };
}
