'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ChatbotResponse } from '@/types/chatbot';

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);

  const [chatData, setChatData] = useState<ChatbotResponse | null>(null);
  const [selectionPath, setSelectionPath] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/ws/');
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(''); // 초기 프롬프트 요청
    };

    ws.onmessage = (event) => {
      try {
        const data: ChatbotResponse = JSON.parse(event.data);
        setChatData(data);
      } catch (err) {
        console.error('JSON 파싱 오류:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket 에러 발생:', err);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket 연결 종료 (code: ${event.code})`);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSelect = (option: string) => {
    const trimmed = option.trim();
    const newPath = [...selectionPath, option];

    setSelectionPath(newPath);
    socketRef.current?.send(trimmed);
  };

  const handleReset = () => {
    setSelectionPath([]);
    setChatData(null);
    socketRef.current?.send('');
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-26 bottom-[170px] !left-auto w-full max-w-[360px] rounded-2xl border bg-white p-6 shadow-lg'
    >
      <SheetHeader>
        <SheetTitle className='sr-only'>챗봇</SheetTitle>
      </SheetHeader>

      {chatData && chatData.answer && (
        <div className='mb-4'>
          <p className='text-lg font-semibold whitespace-pre-line text-gray-600'>
            {chatData.answer}
          </p>
          <div className='mt-2 border-b' />
        </div>
      )}

      {chatData?.options && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {chatData.options
            .split(',')
            .map((opt) => opt.trim())
            .map((option) => (
              <Button
                key={option}
                onClick={() => handleSelect(option)}
                variant='outline'
                className='hover:bg-main-light rounded-full px-4 py-1 text-sm'
              >
                {option}
              </Button>
            ))}
        </div>
      )}

      {chatData?.is_terminate && (
        <div className='mt-6 flex justify-end gap-2'>
          <Button onClick={handleReset} variant='outline' className='rounded-md px-3 py-1 text-sm'>
            돌아가기
          </Button>
          <Button className='bg-main-light rounded-md px-3 py-1 text-sm text-white hover:bg-green-600'>
            이동하기
          </Button>
        </div>
      )}
    </SheetContent>
  );
}
