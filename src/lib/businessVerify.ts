import { apiFetch } from '@/lib/fetcher';

export async function verifyBusinessNumber(
  business_number: string,
): Promise<{ is_valid: boolean }> {
  return await apiFetch('/api/user/business-verify/', {
    method: 'POST',
    body: JSON.stringify({ business_number }),
  });
}
