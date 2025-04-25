export const dynamic = 'force-dynamic';

import PublicJobsPage from './PublicJobsPage';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchKeyword = resolvedSearchParams?.search_keyword;
  return <PublicJobsPage searchParams={searchKeyword} />;
}
