'use client';

import { usePathname } from 'next/navigation';
import ChatbotButton from './ChatbotButton';
import { useEffect } from 'react';
import { useChatbotStore } from '@/store/usechatbotStore';

export function ChatbotButtonWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const { open, setOpen, isNotFoundPage } = useChatbotStore();

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  if (isAdminPage || isNotFoundPage) return null;

  return <>{open && <ChatbotButton />}</>;
}
