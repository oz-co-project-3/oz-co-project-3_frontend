//test 찜하기 버튼 테스트 페이지
'use client';

import { Button } from '@/components/ui/button';
import LoginGuard from '@/components/common/guards/LoginGuard';

export default function LoginGuardTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background-ivory px-4">
      <h1 className="text-2xl font-bold text-main-dark">찜하기 테스트 페이지</h1>

      <LoginGuard>
        <Button className="bg-main-light text-white hover:bg-main-dark">
          ❤️
        </Button>
      </LoginGuard>
    </main>
  );
}
