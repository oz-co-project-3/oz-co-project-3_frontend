'use client';

import { apiFetch } from '@/lib/fetcher';
import { SWRConfig } from 'swr';

export default function SwrProvider({ children }: { children: React.ReactNode }) {
  const fetcher = async (url: string) => {
    const response = await apiFetch(url);
    return response;
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        errorRetryCount: 3,
        errorRetryInterval: 3000,
      }}
    >
      {children}
    </SWRConfig>
  );
}

// 차후에 필요한 옵션 추가
