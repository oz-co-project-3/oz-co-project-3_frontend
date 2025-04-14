'use client';

import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function ChatbotPopup() {
  return (
    <SheetContent
      side='bottom'
      className='data-[state=open]:animate-in data-[state=open]:fade-in-0 !fixed bottom-[170px] left-[1380px] !h-[460px] w-full !max-w-[360px] rounded-2xl border bg-white p-4 shadow-lg data-[state=closed]:opacity-0 data-[state=closed]:duration-100'
    >
      <SheetHeader>
        <SheetTitle className='text-2xl font-bold'>무엇을 도와드릴까요?</SheetTitle>
      </SheetHeader>
    </SheetContent>
  );
}
