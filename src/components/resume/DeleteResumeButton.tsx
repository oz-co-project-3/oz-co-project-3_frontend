'use client';

import { Button } from '../ui/button';

export default function DeleteResumeButton({ id }: { id: string }) {
  console.log(id);

  return (
    <Button className='bg-danger grow cursor-pointer px-2.5 py-5 text-white hover:bg-amber-700'>
      삭제
    </Button>
  );
}
