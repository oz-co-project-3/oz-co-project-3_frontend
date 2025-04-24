'use client';

import axiosInstance from '@/api/axios';
import { SWRConfig } from 'swr';

export default function SwrProvider({ children }: { children: React.ReactNode }) {
  const fetcher = async (url: string) => {
    // 인스턴스 작성 완료 후 업데이트 하기
    const response = await axiosInstance.get(url);
    return response.data;
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
