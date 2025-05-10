'use client';

import { usePathname } from 'next/navigation';
import ChatbotButton from './ChatbotButton';
import { useChatbotStore } from '@/store/chatbotStore';
import { useEffect } from 'react';

export function ChatbotButtonWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin'); //관리자 페이지에서는 렌더링 안함
  const { open, setOpen } = useChatbotStore();

  // 페이지 진입 시 open 상태 true로 설정
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  if (isAdminPage) return null;

  return <>{open && <ChatbotButton />}</>;
}
