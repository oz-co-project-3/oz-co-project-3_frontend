'use client';

import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import ChatbotPopup from './ChatbotPopup';

const ChatbotButton = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Sheet>
        <div className='fixed right-15 bottom-12 z-50 sm:right-20 sm:bottom-15 md:right-25 md:bottom-17 lg:right-30 lg:bottom-20'>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <button
                  aria-label='챗봇 열기'
                  className={cn(
                    'h-20 w-20 rounded-full border border-gray-300 bg-white shadow-md',
                    'flex items-center justify-center transition-all hover:scale-105',
                  )}
                >
                  <Image src='/Character1.png' alt='챗봇 아이콘' width={70} height={70} />
                </button>
              </SheetTrigger>
            </TooltipTrigger>

            <TooltipContent
              side='top'
              sideOffset={8}
              className='bg-main-light rounded-xl border-none px-4 py-2 text-sm text-white shadow-none'
            >
              <p className='px-3 py-1 text-[16px] text-white'>궁금한 점을 물어보세요!</p>
            </TooltipContent>
          </Tooltip>
          <ChatbotPopup />
        </div>
      </Sheet>
    </TooltipProvider>
  );
};

export default ChatbotButton;
