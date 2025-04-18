'use client';

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
import { useState } from 'react';


//이메일 찾기용 모달 추가해야 함

export default function FindAccountTab() {
  const [emailForm, setEmailForm] = useState({ name: '', phone: '' });
  const [pwForm, setPwForm] = useState({ name: '', phone: '', email: '' });
  const [showPwModal, setShowPwModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tabValue, setTabValue] = useState('find-id');
  const handleFindEmail = () => {
    alert('이메일 까먹은 새럼 🙋');
  };

  const handleTabChange = (value: string) => {
    setTabValue(value);
    if (value === 'find-password') {
      setShowPwModal(true); // 비번변경 탭으로 바뀌자마자 모달 나오게
    }
  };

  const handleConfirmPassword = () => {
    if (confirmPassword.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    alert(`입력한 비밀번호를 확인하세요: ${confirmPassword}`);
    setShowPwModal(false); // 입력 완료 후 모달 닫아줌
    setConfirmPassword(''); // 입력 초기화해줘야 함
  };

  const handleFindPw = () => {
    alert('비밀번호 까먹은 새럼 🙋‍♀️');
  };

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

          <TabsContent value='find-id' className='mt-4 space-y-4'>
            <Input
              placeholder='이름'
              value={emailForm.name}
              className='bg-white'
              onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
            />
            <Input
              placeholder='전화번호'
              value={emailForm.phone}
              className='bg-white'
              onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })}
            />
            <Button
              className='bg-main-light hover:bg-main-dark w-full text-white'
              onClick={handleFindEmail}
            >
              이메일 찾기
            </Button>
          </TabsContent>

          {/* +++++++++++!!!!!!!비밀번호 확인 모달 부분!!!!!!*/}
          <Dialog open={showPwModal} onOpenChange={setShowPwModal}>
            <DialogContent className='max-w-sm'>
              <DialogHeader>
                <DialogTitle>비밀번호 확인</DialogTitle>
              </DialogHeader>
              <p className='mt-3 text-m text-gray-600'>
                비밀번호를 변경하시려면 현재 비밀번호를 입력해주세요.
              </p>
              <div className='mt-4 space-y-4'>
                <Input
                  type='password'
                  placeholder='비밀번호를 입력하세요.'
                  value={confirmPassword}
                  className='bg-white'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <DialogFooter className='mt-4'>
                <Button
                  className='bg-main-light hover:bg-main-dark w-full text-white'
                  onClick={handleConfirmPassword}
                >
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <TabsContent value='find-password' className='mt-4 space-y-4'>
            <Input
              placeholder='이름'
              value={pwForm.name}
              className='bg-white'
              onChange={(e) => setPwForm({ ...pwForm, name: e.target.value })}
            />
            <Input
              placeholder='전화번호'
              value={pwForm.phone}
              className='bg-white'
              onChange={(e) => setPwForm({ ...pwForm, phone: e.target.value })}
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
      </div>
    </div>
  );
}
