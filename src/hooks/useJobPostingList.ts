import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import { JobPostingWithRejects } from '@/types/Schema/jobPostingSchema';

export default function useJobPostingList() {
  const { data, error, isLoading, mutate } = useSWR<JobPostingWithRejects[]>(
    '/api/admin/job-posting/',
    fetchOnClient,
  );

  return {
    postings: data ?? [],
    error,
    loading: isLoading,
    mutate,
  };
}
//전체 리스트 불러오는 훅