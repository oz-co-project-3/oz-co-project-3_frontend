'use client';

import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';
import { CompanyProfileFormSchema } from '@/types/Schema/companySchema';

export default function CompanyEditPage() {
  const handleEditSubmit = (data: CompanyProfileFormSchema) => {
    console.log('기업횐 정보:', data);
    // 나중에 API 호출할 것...
  };

  const handlePasswordChange = () => {
    alert('비밀번호 변경누름');
  };

  const handleWithdraw = () => {
    alert('탈퇴해~~~~');
  };

  const defaultValues = {
    email: '471EH@gmail.com',
    company_name: '기태쓰낙원상가',
    company_start_date: '2020-01-01',
    business_number: '123-45-67890',
    company_description: 'Gold teeth sittin on the dash. she a rockstar',
    manager_name: '마요누아',
    manager_phone_number: '010-1111-1111',
    manager_email: 'mayoandnoir@gmail.com',
  };

  return (
    <CompanyProfileForm
      type="edit"
      defaultValues={defaultValues}
      onSubmit={handleEditSubmit}
      onPasswordChange={handlePasswordChange}
      onWithdraw={handleWithdraw}
    />
  );
}
