'use client';

import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { findEmail, findPassword } from '@/api/findAccount';
import { useRouter } from 'next/navigation';

export default function FindAccountTab() {
  const router = useRouter();
  const [emailForm, setEmailForm] = useState({ name: '', phone_number: '' });
  const [pwForm, setPwForm] = useState({ name: '', phone_number: '', email: '' });
  const [showPwSuccessModal, setShowPwSuccessModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [foundEmail, setFoundEmail] = useState('');
  const [tabValue, setTabValue] = useState('find-id');

  const handleTabChange = (value: string) => {
    setTabValue(value);
  };

  const handleFindEmail = useCallback(async () => {
    try {
      if (!emailForm.name.trim() || !emailForm.phone_number.trim()) {
        alert('이름과 전화번호를 모두 입력해주세요.');
        return;
      }

      const email = await findEmail(emailForm);
      setFoundEmail(email);
      setShowEmailModal(true);
    } catch (error) {
      console.error('이메일 찾기 실패:', error);
      alert('이메일 찾기에 실패했습니다.');
    }
  }, [emailForm]);

  const handleFindPw = useCallback(async () => {
    try {
      if (!pwForm.name.trim() || !pwForm.phone_number.trim() || !pwForm.email.trim()) {
        alert('이름, 전화번호, 이메일을 모두 입력해주세요.');
        return;
      }

      await findPassword(pwForm);
      router.push(`/user/email-verification?email=${encodeURIComponent(pwForm.email)}&type=change-password`);

      setShowPwSuccessModal(true);
    } catch (error: unknown) {
      console.error('비밀번호 찾기 실패:', error);

      if (error instanceof Error && error.message.includes('user_not_found')) {
        alert('입력한 정보와 일치하는 사용자가 없습니다.');
      } else {
        alert('비밀번호 찾기 중 오류가 발생했습니다.');
      }
    }
  }, [pwForm]);

  return (
    <div className='bg--backgroundivory relative min-h-screen px-4'>
      <div className='absolute top-1/3 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-md'>
        <Tabs
          defaultValue='find-id'
          value={tabValue}
          onValueChange={handleTabChange}
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger
              value='find-id'
              className='data-[state=active]:bg-main-light border-main-light rounded-t-md border text-sm data-[state=active]:text-white'
            >
              이메일 찾기
            </TabsTrigger>
            <TabsTrigger
              value='find-password'
              className='data-[state=active]:bg-main-light border-main-light rounded-t-md border text-sm data-[state=active]:text-white'
            >
              비밀번호 찾기
            </TabsTrigger>
          </TabsList>

          {/* 이메일 찾기 탭 */}
          <TabsContent value='find-id' className='mt-4 space-y-4'>
            <Input
              placeholder='이름'
              value={emailForm.name}
              className='bg-white'
              onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
            />
            <Input
              placeholder='전화번호'
              value={emailForm.phone_number}
              className='bg-white'
              onChange={(e) => setEmailForm({ ...emailForm, phone_number: e.target.value })}
            />
            <Button
              className='bg-main-light hover:bg-main-dark w-full text-white'
              onClick={handleFindEmail}
            >
              이메일 찾기
            </Button>
          </TabsContent>

          {/* 비밀번호 찾기 탭 */}
          <TabsContent value='find-password' className='mt-4 space-y-4'>
            <Input
              placeholder='이름'
              value={pwForm.name}
              className='bg-white'
              onChange={(e) => setPwForm({ ...pwForm, name: e.target.value })}
            />
            <Input
              placeholder='전화번호'
              value={pwForm.phone_number}
              className='bg-white'
              onChange={(e) => setPwForm({ ...pwForm, phone_number: e.target.value })}
            />
            <Input
              placeholder='이메일'
              type='email'
              value={pwForm.email}
              className='bg-white'
              onChange={(e) => setPwForm({ ...pwForm, email: e.target.value })}
            />
            <Button
              className='bg-main-light hover:bg-main-dark w-full text-white'
              onClick={handleFindPw}
            >
              비밀번호 찾기
            </Button>
          </TabsContent>
        </Tabs>

        {/* 찾은 이메일 보여주는 모달 */}
        <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
          <DialogContent className='max-w-sm'>
            <DialogHeader>
              <DialogTitle>이메일 찾기 완료</DialogTitle>
            </DialogHeader>
            <p className='mt-4 text-center text-sm text-muted-foreground'>회원가입 시 사용한 이메일입니다.</p>
            <p className='mt-1 text-center text-lg font-semibold'>{foundEmail}</p>
            <DialogFooter className='mt-6'>
              <Button
                className='bg-main-light hover:bg-main-dark w-full text-white'
                onClick={() => setShowEmailModal(false)}
              >
                확인
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 비밀번호 찾기 모달 */}
        <Dialog open={showPwSuccessModal} onOpenChange={setShowPwSuccessModal}>
          <DialogContent className='max-w-sm'>
            <DialogHeader>
              <DialogTitle>비밀번호 변경 인증코드 전송</DialogTitle>
            </DialogHeader>
            <p className='mt-4 text-center text-lg font-semibold'>
              입력하신 이메일로 비밀번호 변경을 위한 인증코드를 발송했습니다.
            </p>
            <DialogFooter className='mt-6'>
              <Button
                className='bg-main-light hover:bg-main-dark w-full text-white'
                onClick={() => setShowPwSuccessModal(false)}
              >
                확인
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
