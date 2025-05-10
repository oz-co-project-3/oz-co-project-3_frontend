'use client';

import AuthInitializer from '@/components/common/AuthInitializer';
import AutoTokenRefresher from '@/components/common/AutoTokenRefresher';
import { ChatbotButtonWrapper } from '@/components/chatbot/ChatbotButtonWrapper';
import LoginRequiredModal from '@/components/common/modals/LoginRequiredModal';

export default function ClientWrapper() {
  return (
    <>
      <AuthInitializer />
      <AutoTokenRefresher />
      <ChatbotButtonWrapper />
      <LoginRequiredModal />
    </>
  );
}
