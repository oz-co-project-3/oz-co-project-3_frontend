'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// 검색 이동 로직을 커스텀 훅으로 분리
export function useSearchNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateWithSearch = (searchKeyword: string): void => {
    const targetPath = pathname === '/' ? '/all-jobs' : pathname;
    router.push(`${targetPath}?search_keyword=${encodeURIComponent(searchKeyword)}`);

    if (!searchKeyword) {
      // search_keyword가 비어있으면 파라미터를 제거
      // 기존 쿼리스트링에서 search_keyword만 제거
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search_keyword');
      const queryString = params.toString();
      // 쿼리스트링이 남아 있으면 붙이고, 아니면 쿼리 없이 이동
      router.push(queryString ? `${targetPath}?${queryString}` : targetPath);
      return;
    }

    // search_keyword가 있으면 기존 쿼리 유지 + search_keyword만 갱신
    const params = new URLSearchParams(searchParams.toString());
    params.set('search_keyword', searchKeyword);
    router.push(`${targetPath}?${params.toString()}`);
  };

  return { navigateWithSearch };
}
