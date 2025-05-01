import { apiFetch } from '@/lib/fetcher';
import { JobPostingSchema } from '@/types/Schema/jobPostingSchema';
import useSWRMutation from 'swr/mutation';

export const jobPostingApi = {
  post: useSWRMutation('/api/job-postings', async (url, { arg }: { arg: JobPostingSchema }) => {
    return apiFetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    });
  }),
};
