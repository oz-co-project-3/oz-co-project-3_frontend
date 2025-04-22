'use client';

import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';
import { CompanyProfileFormSchema } from '@/types/Schema/companySchema';

export default function CompanyRegisterPage() {
  const handleRegisterSubmit = (data: CompanyProfileFormSchema) => {
    console.log('회원가입 데이터:', data);
    // 나중에 API 호출할 것...
  };

  return (
    <CompanyProfileForm
      type="register"
      onSubmit={handleRegisterSubmit}
    />
  );
}
