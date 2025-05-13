import { redirect } from 'next/navigation';

export default async function Page() {
  redirect('/dashboard/job-seeker/profile');
}

// 바로 리렌더링 (/dashboard/job-seeker/profile)
