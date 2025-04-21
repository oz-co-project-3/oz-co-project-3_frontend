'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CHATBOT_API } from '@/constants/chatbot';
import type { ChatbotPrompt } from '@/types/chatbot';

export default function ChatbotAdminClient() {
  const [prompts, setPrompts] = useState<ChatbotPrompt[]>([]);

  const fetchPrompts = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;

      const res = await fetch(CHATBOT_API.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setPrompts(data);
      }
    } catch (error) {
      console.error('프롬프트 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className='p-36 pt-20'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>전체 응답 목록</h2>
        <Button className='bg-main-light hover:bg-main-dark text-white'>+ 추가하기</Button>
      </div>

      <div className='overflow-auto rounded-md border border-gray-200 shadow-sm'>
        <table className='min-w-full text-left text-sm'>
          <thead className='border-b bg-gray-50 font-semibold text-gray-700'>
            <tr>
              <th className='px-4 py-3'>STEP</th>
              <th className='px-4 py-3'>선택 경로</th>
              <th className='px-4 py-3'>응답</th>
              <th className='px-4 py-3'>옵션</th>
              <th className='px-4 py-3'>종료</th>
              <th className='px-4 py-3 text-right'>관리</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='px-4 py-2'>{item.step}</td>
                <td className='px-4 py-2'>{item.selection_path}</td>
                <td className='px-4 py-2 text-gray-700'>{item.answer}</td>
                <td className='px-4 py-2 text-gray-500'>{item.options ?? '없음'}</td>
                <td className='px-4 py-2'>{item.is_terminate ? '✅' : ''}</td>
                <td className='px-4 py-2 text-right'>
                  <Button size='sm' variant='outline' className='mr-2'>
                    수정
                  </Button>
                  <Button size='sm' variant='destructive'>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}

            {prompts.length === 0 && (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-gray-400'>
                  프롬프트가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
