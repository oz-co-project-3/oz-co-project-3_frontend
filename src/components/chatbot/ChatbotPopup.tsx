'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ChatbotResponse } from '@/types/chatbot';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);

  const [chatData, setChatData] = useState<ChatbotResponse | null>(null);
  const [selectionPath, setSelectionPath] = useState<string[]>([]);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [resetFlag, setResetFlag] = useState(false); // 리셋용

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL!}/api/ws/`);
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(''); // 초기 프롬프트 요청
    };

    ws.onmessage = (event) => {
      try {
        console.log('WebSocket 응답 도착:', event.data);
        const data: ChatbotResponse = JSON.parse(event.data);
        setChatData(data);

        if (data.answer) {
          setChatLog((prev) => [...prev, { sender: 'bot', message: data.answer }]); // bot 응답 누적
        }
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
  }, [resetFlag]); // resetFlag로 연결 재설정

  // 옵션 선택
  const handleSelect = (option: string) => {
    const trimmed = option.trim();
    const newPath = [...selectionPath, trimmed];
    setSelectionPath(newPath);

    setChatLog((prev) => [...prev, { sender: 'user', message: `"${trimmed}"` }]); // 유저 선택 누적
    socketRef.current?.send(trimmed);
    console.log('[선택한 옵션 전송]:', trimmed);
  };

  // 뒤로가기
  const handleBack = () => {
    if (selectionPath.length === 0) return;
    setSelectionPath((prev) => prev.slice(0, -1));
    socketRef.current?.send('reverse'); // 서버에 'reverse' 요청해서 뒤로가기
  };

  // 전체 리셋
  const handleReset = () => {
    setSelectionPath([]);
    setChatData(null);
    setChatLog([]); // 대화 기록 초기화
    setResetFlag((prev) => !prev); // WebSocket 재연결
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-26 bottom-[170px] !left-auto w-full max-w-[360px] overflow-y-auto rounded-2xl border bg-white p-6 shadow-lg'
    >
      {/* 뒤로가기 버튼 */}
      <div className='flex items-center justify-between'>
        <button onClick={handleBack} disabled={selectionPath.length === 0}>
          <span className='text-xl text-gray-500'>{'←'}</span>
        </button>
        <SheetHeader>
          <SheetTitle className='sr-only'>챗봇</SheetTitle>
        </SheetHeader>
      </div>

      {/* 누적된 채팅 로그 */}
      <div className='flex flex-col gap-4'>
        {chatLog.map((chat, idx) => (
          <div key={idx} className={chat.sender === 'user' ? 'text-right' : 'text-left'}>
            <p
              className={`inline-block rounded-lg px-4 py-2 ${
                chat.sender === 'user' ? 'bg-green-200 text-gray-700' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {chat.message}
            </p>
          </div>
        ))}
      </div>

      {/* 옵션 버튼들 */}
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

      {/* 종료 버튼 및 이동 버튼 */}
      <div className='mt-6 flex justify-end gap-2'>
        {chatData?.is_terminate && (
          <Button onClick={handleReset} variant='outline' className='rounded-md px-3 py-1 text-sm'>
            돌아가기
          </Button>
        )}
        {chatData?.url && chatData.url.trim() !== '' && (
          <Button
            onClick={() => {
              if (chatData.url) {
                window.location.href = chatData.url;
              }
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
