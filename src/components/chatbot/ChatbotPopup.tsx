'use client';

import { useEffect, useRef, useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface ChatbotResponse {
  step: number;
  selection_path: string;
  answer: string;
  options: string | null;
  is_terminate: boolean;
}

// 채팅 메시지 타입 정의
type ChatMessage = {
  type: 'bot' | 'user';
  message: string;
};

export default function ChatbotPopup() {
  const socketRef = useRef<WebSocket | null>(null);

  // 문자열 배열 → 객체 배열로 변경
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isTerminate, setIsTerminate] = useState(false);
  const [selectionPath, setSelectionPath] = useState<string[]>([]);
  //   const [lastAnswer, setLastAnswer] = useState<string>('');
  //   const [step, setStep] = useState<number>(0); // step 상태 저장

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8000/api/ws/');
    socketRef.current = webSocket;

    webSocket.onopen = () => {
      webSocket.send(''); // 초기 메시지 수신 유도
    };

    webSocket.onmessage = (event) => {
      const data: ChatbotResponse = JSON.parse(event.data);

      //   setStep(data.step); // step 갱신
      //   setChatLog((prev) => [...prev, { type: 'bot', messag : data.answer }]);

      if (typeof data.options === 'string') {
        const parsed = data.options.split(',').map((opt) => opt.trim());
        setOptions(parsed);
      } else {
        setOptions([]);
      }

      setIsTerminate(data.is_terminate);
      //   setLastAnswer(data.answer);
    };

    webSocket.onerror = (err) => {
      console.error('WebSocket 오류:', err);
    };

    webSocket.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      webSocket.close();
    };
  }, []);

  const handleSelect = (option: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const fullPath = [...selectionPath, option].join('/'); // 누적된 경로 보냄
      socketRef.current.send(fullPath);

      setChatLog((prev) => [...prev, { type: 'user', message: `"${option}"` }]);
      setSelectionPath((prev) => [...prev, option]);
    } else {
      console.warn('WebSocket 연결 안열림!');
    }
  };

  const handleReset = () => {
    setChatLog([]);
    setOptions([]);
    setIsTerminate(false);
    setSelectionPath([]);
    // setLastAnswer('');
    // setStep(0); // 초기화
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-26 bottom-[170px] !left-auto w-full max-w-[360px] rounded-2xl border bg-white p-6 shadow-lg'
    >
      <SheetHeader>
        <SheetTitle className='sr-only'>챗봇</SheetTitle>
      </SheetHeader>

      {/* step 1일 때만 고정 안내 출력 관리자 페이지 생성 후에 수정*/}
      {/* {step === 1 && (
        <div className='mb-3'>
          <h2 className='mb-1 text-xl font-bold'>무엇을 도와드릴까요?</h2>
          <p className='text-sm whitespace-pre-line text-gray-500'>
            궁금한 점을 선택해주시면 <br />
            빠르게 해결해드려요!
          </p>
        </div>
      )} */}

      <div className='flex flex-col gap-2'>
        {chatLog.map((msg, idx) => (
          <p
            key={idx}
            className={`text-sm ${
              msg.type === 'user' ? 'text-main-light text-right' : 'text-gray-700'
            }`}
          >
            {msg.message}
          </p>
        ))}
      </div>

      {options.length > 0 && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {options.map((option) => (
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

      {isTerminate && (
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
