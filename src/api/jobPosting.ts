'use server';

import { revalidatePath } from 'next/cache';
import fetchOnServer from './serverFetcher';
import { redirect } from 'next/navigation';

export const deleteJobPosting = async (id: string) => {
  // TODO: 에러 처리 (try, catch)
  const response = await fetchOnServer(`/api/job_posting/${id}/`, {
    method: 'DELETE',
  });
  console.log(response);
  revalidatePath('/dashboard/business/job-postings/current');
  redirect('/dashboard/business/job-postings/current');
};
