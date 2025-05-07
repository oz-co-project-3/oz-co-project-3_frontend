'use client';

import { useRouter } from 'next/navigation';
import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';
import { CompanyFormData, User } from '@/types/user';
import { upgradeToBusiness } from '@/api/user';
import { useAuthStore } from '@/store/useAuthStore';

export default function CompanyAuthPage() {
  const router = useRouter();
  const { user, login } = useAuthStore();

  const handleSubmit = async (formData: CompanyFormData) => {
    if (!user) {
      alert('로그인 정보가 없습니다. 먼저 로그인 해주세요.');
      return;
    }

    try {
      const res = await upgradeToBusiness(formData);

      const updatedUser: User = {
        id: res.user_id,
        email: res.email,
        name: res.name || '',
        user_type: res.user_type[0] as 'normal' | 'business' | 'admin',
        signinMethod: res.signinMethod[0] as 'email' | 'naver' | 'kakao',
      };

      login(updatedUser, res.access_token);

      alert('기업회원 인증 완료!');
      router.push('/');
    } catch (err) {
      console.error('기업회원 인증 실패:', err);
      alert('기업회원 인증 중 오류가 발생했습니다.');
    }
  };

  return <CompanyProfileForm type='register' onSubmit={handleSubmit} />;
}
