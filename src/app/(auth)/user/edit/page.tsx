'use client';

import { useState } from 'react';
import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';

export default function SeekerEditPage() {
  // 임시 데이터
  const [userData] = useState<Partial<SeekerFormData>>({
    name: '나기태',
    email: '471EH@gmail.com',
    birth: '1960-01-01',
    phone_number: '01012345678',
    gender: 'male',
    interests: ['사무', '기술직'],
    purposes: ['교육 및 재취업 준비', '기타'],
    sources: ['네이버 검색'],
  });

  const handleSubmit = (formData: SeekerFormData) => {
    console.log('📝 회원정보 수정', formData);
  };

  return (
    <main className='px-4 py-10'>
      <SeekerProfileForm type='edit' defaultValues={userData} onSubmit={handleSubmit} />
    </main>
  );
}
