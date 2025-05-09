'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useChatbotStore } from '@/store/chatbotStore';
import { ChatbotResponse } from '@/types/chatbot';

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);
  const [resetFlag, setResetFlag] = useState(false);

  const {
    chatData,
    chatLog,
    selectionPath,
    setChatData,
    setSelectionPath,
    appendBotMessage,
    appendUserMessage,
    reset,
  } = useChatbotStore();

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL!}/api/ws/`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
      ws.send('');
    };

    ws.onmessage = (event) => {
      try {
        console.log('WebSocket 응답 도착:', event.data);
        const data: ChatbotResponse = JSON.parse(event.data);
        setChatData(data);
        if (data.answer) appendBotMessage(data.answer);
      } catch (err) {
        console.error('JSON 파싱 오류:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket 에러 발생:', err);
    };
    ws.onclose = () => console.log('WebSocket 연결 종료');

    return () => ws.close();
  }, [resetFlag, setChatData, appendBotMessage]);

  const handleSelect = (option: string) => {
    const trimmed = option.trim();
    setSelectionPath([...selectionPath, trimmed]);
    appendUserMessage(`"${trimmed}"`);
    socketRef.current?.send(trimmed);
  };

  const handleBack = () => {
    if (selectionPath.length === 0) return;
    setSelectionPath(selectionPath.slice(0, -1));
    socketRef.current?.send('reverse');
  };

  const handleReset = () => {
    reset();
    setResetFlag((prev) => !prev);
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-26 bottom-[170px] !left-auto w-full max-w-[360px] overflow-y-auto rounded-2xl border bg-white p-6 shadow-lg'
    >
      <div className='flex items-center justify-between'>
        <button onClick={handleBack} disabled={selectionPath.length === 0}>
          <span className='text-xl text-gray-500'>←</span>
        </button>
        <SheetHeader>
          <SheetTitle className='sr-only'>챗봇</SheetTitle>
        </SheetHeader>
      </div>

      <div className='flex flex-col gap-4'>
        {chatLog.map((chat, idx) => (
          <div key={idx} className={chat.sender === 'user' ? 'text-right' : 'text-left'}>
            <p
              className={`inline-block rounded-lg px-4 py-2 whitespace-pre-line ${
                chat.sender === 'user' ? 'bg-green-200 text-gray-700' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {chat.message.replace(/\\n/g, '\n')}
            </p>
          </div>
        ))}
      </div>

      {chatData?.options && (
        <div className='flex flex-wrap gap-2'>
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

      <div className='mt-6 flex justify-end gap-2'>
        {chatData?.is_terminate && (
          <Button onClick={handleReset} variant='outline' className='rounded-md px-3 py-1 text-sm'>
            돌아가기
          </Button>
        )}
        {chatData?.url && (
          <Button
            onClick={() => {
              if (chatData.url) window.location.href = chatData.url;
            }}
            className='bg-main-light rounded-md px-3 py-1 text-sm text-white hover:bg-green-600'
          >
            이동하기
          </Button>
        )}
      </div>
    </SheetContent>
  );
}
