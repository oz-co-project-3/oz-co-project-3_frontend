import { fetchOnClient } from '@/api/clientFetcher';

export async function resendEmailCode(email: string): Promise<void> {
  await fetchOnClient('/api/user/resend-email-code/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
