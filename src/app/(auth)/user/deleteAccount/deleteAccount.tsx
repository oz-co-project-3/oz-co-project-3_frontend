'use client';

import { useState } from 'react';
import { deleteUser } from '@/api/user';
import { useAuthStore } from '@/store/useAuthStore';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function DeleteAccountFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | null>(null);
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const logout = useAuthStore((state) => state.logout);

  const handleDelete = async () => {
    try {
      await deleteUser({
        password,
        is_active: false,
        reason,
      });
      logout();
      localStorage.clear();
      setStep(3);
    } catch (err) {
      console.error('탈퇴 실패:', err);
      setError('비밀번호가 틀렸거나 탈퇴에 실패했습니다.');
    }
  };

  return (
    <>
      <Button variant='link' className='text-sm text-gray-500 underline' onClick={() => setStep(1)}>
        탈퇴하기
      </Button>

      {/* STEP 1 - 비밀번호 입력 */}
      <Dialog open={step === 1} onOpenChange={() => setStep(null)}>
        <DialogContent>
          <DialogHeader>비밀번호 확인</DialogHeader>
          <Input
            type='password'
            placeholder='현재 비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <DialogFooter>
            <Button onClick={() => setStep(2)} disabled={!password}>
              다음
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* STEP 2 - 탈퇴 사유 입력 */}
      <Dialog open={step === 2} onOpenChange={() => setStep(null)}>
        <DialogContent>
          <DialogHeader>탈퇴 사유</DialogHeader>
          <Textarea
            placeholder='탈퇴 사유를 입력해주세요'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant='outline' onClick={() => setStep(1)}>
              이전
            </Button>
            <Button onClick={handleDelete} disabled={!reason}>
              탈퇴하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* STEP 3 - 완료 */}
      <Dialog open={step === 3} onOpenChange={() => setStep(null)}>
        <DialogContent>
          <DialogHeader>탈퇴 완료</DialogHeader>
          <p className='text-center text-sm'>회원 탈퇴가 완료되었습니다. 감사합니다.</p>
          <DialogFooter>
            <Button
              onClick={() => {
                setStep(null);
                window.location.href = '/';
              }}
            >
              홈으로
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
