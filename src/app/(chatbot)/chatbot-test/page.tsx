'use client';

import ChatbotButton from '@/components/chatbot/ChatbotButton';

export default function ChatbotPlayground() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100'>
      <h1 className='text-2xl text-gray-600'>챗봇 테스트 페이지</h1>

      <ChatbotButton />
    </main>
  );
}
