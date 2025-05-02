'use client';

import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';
import { registerSeeker } from '@/api/user';
import { useRouter } from 'next/navigation';
import { convertArrayFieldsToString } from '@/lib/stringArrayConverter';

export default function SeekerRegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: SeekerFormData) => {
    try {
      const cleaned = convertArrayFieldsToString(formData);
      const formattedData = {
        ...cleaned,
        signinMethod: 'email', 
      };
  
      await registerSeeker(formattedData as SeekerFormData); 
      localStorage.setItem('registerFormData', JSON.stringify(formData)); 
      router.push('/user/email-verification');
    } catch (err) {
      console.error('이메일 인증 요청 실패:', err);
      alert('이메일 인증 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className='px-4 py-10'>
      <SeekerProfileForm type='register' onSubmit={handleSubmit} />
    </main>
  );
}
