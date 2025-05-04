import { fetchOnClient } from '@/api/clientFetcher';

export async function findEmail(formData: { name: string; phone_number: string }): Promise<string> {
  const res = await fetchOnClient<{ message: string; data: { email: string } }>(
    '/api/user/find-email',
    {
      method: 'POST',
      body: JSON.stringify(formData),
    },
  );

  return res.data.email;
}

export async function findPassword(formData: {
  name: string;
  phone_number: string;
  email: string;
}): Promise<void> {
  await fetchOnClient('/api/user/find-password/', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
