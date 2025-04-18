'use client';

import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';
import { registerUser } from '@/api/user';
import { useRouter } from 'next/navigation';

export default function SeekerRegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: SeekerFormData) => {
    try {
      console.table(formData);

      const res = await registerUser(formData);
      console.log('회원가입 성공:', res);

      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (err: unknown) {
      console.error('회원가입 실패:', err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className='px-4 py-10'>
      <SeekerProfileForm type='register' onSubmit={handleSubmit} />
    </main>
  );
}
