import { fetchOnClient } from '@/api/clientFetcher';

export async function verifyBusinessNumber(
  business_number: string,
): Promise<{ is_valid: boolean }> {
  return await fetchOnClient('/api/user/business-verify/', {
    method: 'POST',
    body: JSON.stringify({ business_number }),
  });
}
