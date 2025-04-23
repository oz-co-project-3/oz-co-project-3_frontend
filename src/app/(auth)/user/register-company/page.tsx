'use client';

import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';
import { CompanyFormData } from '@/types/user';
import { registerCompany } from '@/api/user';
import { useRouter } from 'next/navigation';

export default function CompanyRegisterPage() {
  const router = useRouter();

  const handleRegisterSubmit = async (formData: CompanyFormData) => {
    try {
      console.table(formData);

      await registerCompany(formData);
      localStorage.setItem('registerFormData', JSON.stringify(formData));
      router.push('/user/email-verification');
    } catch (err) {
      console.error('이메일 인증 요청 실패:', err);
      alert('이메일 인증 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <CompanyProfileForm
      type="register"
      onSubmit={handleRegisterSubmit}
    />
  );
}
