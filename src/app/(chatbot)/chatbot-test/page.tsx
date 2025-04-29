import ChatbotButton from '@/components/chatbot/ChatbotButton';

export default async function ChatbotPlayground() {
  console.log('WS:', process.env.NEXT_PUBLIC_WS_URL);
  console.log('INTERNAL:', process.env.NEXT_PUBLIC_INTERNAL_BASE_URL);
  console.log('EXTERNAL:', process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL);

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100'>
      <h1 className='text-2xl text-gray-600'>챗봇 테스트 페이지</h1>
      <ChatbotButton />
    </main>
  );
}
