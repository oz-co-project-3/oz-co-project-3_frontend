'use client';

import { useState } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MOCK_RESPONSES } from '@/constants/chatbot';
import type { ChatbotResponse } from '@/types/chatbot';

export default function ChatbotPopup() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const data: ChatbotResponse = MOCK_RESPONSES[stepIndex];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const next = stepIndex + 1;
    if (next < MOCK_RESPONSES.length) {
      setStepIndex(next);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setSelectedOption('');
  };

  return (
    <SheetContent
      side='bottom'
      className='!right-30 !bottom-[170px] !left-auto w-full max-w-[360px] rounded-2xl border bg-white p-6 shadow-lg'
    >
      <SheetHeader>
        <SheetTitle className='sr-only'>챗봇</SheetTitle>
      </SheetHeader>

      {stepIndex === 0 && (
        <div className='mb-4'>
          <h2 className='mb-1 text-xl font-bold'>무엇을 도와드릴까요?</h2>
          <p className='text-sm whitespace-pre-line text-gray-500'>
            궁금한 점을 선택해주시면 <br />
            빠르게 해결해드려요!
          </p>
          <div className='mt-2 border-b' />
        </div>
      )}

      {!data.title && data.answer && (
        <div className='mb-4'>
          <h2 className='mb-1 text-lg font-bold'>이력서 작성을 선택하셨어요!</h2>
          <p className='text-md font-semibold whitespace-pre-line text-gray-500'>{data.answer}</p>
          <div className='mt-2 border-b' />
        </div>
      )}

      {selectedOption && (
        <p className='mt-2 text-right text-sm font-medium text-gray-600'>
          &quot;{selectedOption}&quot;
        </p>
      )}

      {data.options.length > 0 && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {data.options.map((option) => (
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

      {data.is_terminate && (
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
