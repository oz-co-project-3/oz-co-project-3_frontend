import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import { JobPostingWithRejects } from '@/types/Schema/jobPostingSchema';

export default function useJobPosting(id: string) {
  const { data, error, isLoading, mutate } = useSWR<JobPostingWithRejects>(
    `/api/admin/job-posting/${id}/`,
    fetchOnClient,
  );

  return {
    jobPosting: data,
    error,
    loading: isLoading,
    mutate,
  };
}
//상세 내용 불러오는 훅