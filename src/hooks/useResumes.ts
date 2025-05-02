'use client';

import { useState } from 'react';

// 목업용 타입
export interface Resume {
  id: number;
  title: string;
  user_id: number;
}

export function useResumes(userId: number) {
  const [data, setData] = useState<Resume[]>([]);

  const refetch = () => {
    // 실제로는 API 요청으로 대체해야 함
    setData([
      { id: 1, title: '첫 번째 이력서', user_id: userId },
      { id: 2, title: '두 번째 이력서', user_id: userId },
    ]);
  };

  return { data, refetch };
}
