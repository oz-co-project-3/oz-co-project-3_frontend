'use client';

import { useState } from 'react';
import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';
import { stringToArray } from '@/lib/stringArrayConverter';

export default function SeekerEditPage() {
  const [userData] = useState({
    name: '나기태',
    email: '471EH@gmail.com',
    birth: '1960-01-01',
    phone_number: '01012345678',
    gender: 'male' as 'male' | 'female' | 'none',
    interests: '사무,기술직',
    purposes: '교육 및 재취업 준비,기타',
    sources: '네이버 검색',
  });

  const safeDefaults: Partial<Omit<SeekerFormData, 'interests' | 'purposes' | 'sources'>> & {
    interests?: string[];
    purposes?: string[];
    sources?: string[];
  } = {
    ...userData,
    interests: stringToArray(userData.interests),
    purposes: stringToArray(userData.purposes),
    sources: stringToArray(userData.sources),
  };

  const handleSubmit = (formData: SeekerFormData) => {
    console.log('📝 회원정보 수정', formData);
  };

  return (
    <main className='px-4 py-10'>
      <SeekerProfileForm type='edit' defaultValues={safeDefaults} onSubmit={handleSubmit} />
    </main>
  );
}
