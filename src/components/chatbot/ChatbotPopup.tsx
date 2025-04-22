'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ChatbotResponse } from '@/types/chatbot';

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);

  const [chatData, setChatData] = useState<ChatbotResponse | null>(null);
  const [selectionPath, setSelectionPath] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/ws/');
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(''); // 초기 프롬프트 요청
    };

    ws.onmessage = (event) => {
      const data: ChatbotResponse = JSON.parse(event.data);
      setChatData(data);
    };

    ws.onerror = (err) => {
      console.error('WebSocket 에러:', err);
    };

    ws.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const newPath = [...selectionPath, option];
    setSelectionPath(newPath);

    const fullPath = newPath.join('/');
    socketRef.current?.send(fullPath);
  };

  const handleReset = () => {
    setSelectionPath([]);
    setSelectedOption('');
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

      {/* {selectionPath.length === 0 && (
        <div className='mb-4'>
          <h2 className='mb-1 text-xl font-bold'>무엇을 도와드릴까요?</h2>
          <p className='text-sm whitespace-pre-line text-gray-500'>
            궁금한 점을 선택해주시면 <br />
            빠르게 해결해드려요!
          </p>
        </div>
      )} */}

      {chatData && chatData.answer && (
        <div className='mb-4'>
          {selectionPath.length > 0 && (
            <h2 className='mb-1 text-lg font-bold'>선택하신 항목에 대한 안내입니다</h2>
          )}
          <p className='text-md font-semibold whitespace-pre-line text-gray-500'>
            {chatData.answer}
          </p>
          <div className='mt-2 border-b' />
        </div>
      )}

      {selectedOption && (
        <p className='mt-2 text-right text-sm font-medium text-gray-600'>
          &quot;{selectedOption}&quot;
        </p>
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
