import { fetchOnClient } from './clientFetcher';

export default async function uploadImage(
  url: string,
  { arg }: { arg: { file: File } },
): Promise<string> {
  const formData = new FormData();
  formData.append('file', arg.file);

  const response = await fetchOnClient<{ image_url: string }>(url, {
    method: 'POST',
    body: formData,
    skipContentType: true,
  });

  // TODO: 에러 처리

  return response.image_url;
}
