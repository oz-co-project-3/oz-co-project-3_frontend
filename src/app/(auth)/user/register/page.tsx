'use client';

import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';
import { registerSeeker } from '@/api/user';
import { useRouter } from 'next/navigation';
import { convertArrayFieldsToString } from '@/lib/stringArrayConverter';

export default function SeekerRegisterPage() {
  const router = useRouter();

  const handleSubmit = async (data: { [key: string]: unknown }): Promise<void> => {
    try {
      const cleaned = convertArrayFieldsToString(data as unknown as SeekerFormData);

      const formattedData: SeekerFormData = {
        ...cleaned,
        user_type: 'normal',
        signinMethod: 'email',
      };

      await registerSeeker(formattedData);

      // 이메일 인증 페이지에서 사용할 정보 저장
      localStorage.setItem(
        'registerFormData',
        JSON.stringify({
          email: formattedData.email,
          name: formattedData.name,
          user_type: formattedData.user_type,
        }),
      );

      router.push(`/user/email-verification?email=${encodeURIComponent(formattedData.email)}&type=signup`
);
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
