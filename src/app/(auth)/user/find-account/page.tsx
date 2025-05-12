import { Suspense } from 'react';
import FindAccountTabClient from './_components/FindAccountTabClient';

export default function FindAccountPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FindAccountTabClient />
    </Suspense>
  );
}
