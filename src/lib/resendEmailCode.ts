import { apiFetch } from '@/lib/fetcher';

export async function resendEmailCode(email: string): Promise<void> {
  await apiFetch('/api/user/resend-email-code/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
