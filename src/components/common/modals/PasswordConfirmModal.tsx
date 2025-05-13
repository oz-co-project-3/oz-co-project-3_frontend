'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { verifyPassword } from '@/api/user';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PasswordConfirmModal({ open, onOpenChange }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await verifyPassword(password);
      onOpenChange(false);
      router.push('/user/change-password');
    } catch {
      setError('비밀번호가 틀립니다. 다시 입력해주세요.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>비밀번호 확인</DialogTitle>
        </DialogHeader>
        <Input
          type='password'
          placeholder='현재 비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className='text-sm text-red-500'>{error}</p>}
        <DialogFooter className='mt-4'>
          <Button className='w-full bg-main-light text-white' onClick={handleSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
