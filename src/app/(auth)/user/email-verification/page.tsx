import { Suspense } from 'react';
import EmailVerificationClient from './_components/EmailVerificationClient';

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <EmailVerificationClient />
    </Suspense>
  );
}
