import { Suspense } from 'react';
import PriviteJobsPage from './PrivateJobsPage';

export default async function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PriviteJobsPage />
    </Suspense>
  );
}
//여기서 데이터 페칭 받아서 넘겨주기
