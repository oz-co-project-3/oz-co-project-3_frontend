'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deleteUser } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WithdrawModal({ open, onOpenChange }: WithdrawModalProps) {
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleWithdraw = async () => {
    if (!password || !reason) {
      alert('비밀번호와 탈퇴 사유를 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      await deleteUser({ password, reason, is_active: false });
      alert('탈퇴가 완료되었습니다.');
      logout();
      router.push('/');
    } catch (err) {
      console.error('탈퇴 실패', err);
      alert('비밀번호가 일치하지 않거나 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <Label>비밀번호</Label>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호 입력'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>탈퇴 사유</Label>
            <Select onValueChange={setReason} value={reason}>
              <SelectTrigger>
                <SelectValue placeholder='탈퇴 사유 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='서비스 불만족'>서비스 불만족</SelectItem>
                <SelectItem value='사용 빈도 낮음'>사용 빈도 낮음</SelectItem>
                <SelectItem value='개인정보 우려'>개인정보 우려</SelectItem>
                <SelectItem value='기타'>기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter
          className='!sm:flex-col mt-6 flex flex-col gap-2'
          style={{ flexDirection: 'column', alignItems: 'stretch' }}
        >
          <Button
            onClick={handleWithdraw}
            disabled={loading}
            className='cursor-pointer bg-amber-600 text-white hover:bg-amber-800'
          >
            탈퇴하기
          </Button>
          <Button onClick={() => onOpenChange(false)} variant='outline' className='w-full'>
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
