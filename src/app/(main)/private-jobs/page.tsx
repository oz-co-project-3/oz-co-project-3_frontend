export const dynamic = 'force-dynamic';

import PriviteJobsPage from './PrivateJobsPage';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  // console.log(await searchParams);
  const resolvedSearchParams = await searchParams;
  const searchKeyword = resolvedSearchParams?.search_keyword;
  return <PriviteJobsPage searchParams={searchKeyword} />;
}
//searchParams와 params가 Promise로 제공되어,프로퍼티를 사용하기 전에 반드시 await로 언래핑해야 함
