'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import type { ResumeResponse } from '@/types/Schema/resumeSchema';

export function useResumes(userId: number) {
  const { data = [], error, mutate, isLoading } = useSWR<ResumeResponse[]>(
    userId ? `/api/admin/resume/?user_id=${userId}` : null,
    fetchOnClient,
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    data,
    error,
    refetch,
    isLoading,
  };
}
