'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ChatbotResponse } from '@/types/chatbot';

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);

  const [chatData, setChatData] = useState<ChatbotResponse | null>(null);
  const [selectionPath, setSelectionPath] = useState<string[]>([]);
  const [resetFlag, setResetFlag] = useState(false); // 돌아가기 눌렀을 때 초기화

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/ws/');
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(''); // 초기 프롬프트 요청
    };

    ws.onmessage = (event) => {
      try {
        console.log('WebSocket 응답 도착:', event.data);
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
  }, [resetFlag]);

  //옵션 선택 후 처리
  const handleSelect = (option: string) => {
    const trimmed = option.trim();
    const newPath = [...selectionPath, option];
    setSelectionPath(newPath);
    socketRef.current?.send(trimmed);
    console.log(trimmed);
  };

  //뒤로가기
  const handleBack = () => {
    if (selectionPath.length === 0) return;
    setSelectionPath((prev) => prev.slice(0, -1)); // 상태는 유지
    socketRef.current?.send('reverse'); // 서버에 뒤로가기 요청 전송
  };

  //전체 리셋
  const handleReset = () => {
    setSelectionPath([]);
    setChatData(null);
    setResetFlag((prev) => !prev); //useEffect 재실행
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-26 bottom-[170px] !left-auto w-full max-w-[360px] rounded-2xl border bg-white p-6 shadow-lg'
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

          {chatData.url && (
            <Button
              onClick={() => {
                window.location.href = chatData.url!; // undefined 아님
              }}
              className='bg-main-light rounded-md px-3 py-1 text-sm text-white hover:bg-green-600'
            >
              이동하기
            </Button>
          )}
        </div>
      )}
    </SheetContent>
  );
}
