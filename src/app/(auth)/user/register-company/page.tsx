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

      // 👇 기존 user_type과 응답값을 합쳐서 중복 없이 문자열로 구성
      const prevUserType = user.user_type ?? '';
      const serverUserType = res?.user_type ?? '';

      const combinedTypes = new Set([
        ...prevUserType.split(','),
        ...serverUserType.split(','),
        'business', // 무조건 추가
      ]);

      const mergedUserType = Array.from(combinedTypes)
        .filter(Boolean)
        .join(',') as 'normal' | 'business' | 'admin';

      const updatedUser: User = {
        id: res?.user_id ?? 0,
        email: res?.email ?? '',
        name: res?.name ?? '',
        user_type: mergedUserType,
        signinMethod: res?.signinMethod as 'email' | 'naver' | 'kakao',
      };

      login(updatedUser, res?.access_token ?? '');

      alert('기업회원 인증 완료!');
      router.push('/');
    } catch (err) {
      console.error('기업회원 인증 실패:', err);
      alert('기업회원 인증 중 오류가 발생했습니다.');
    }
  };

  return <CompanyProfileForm type="register" onSubmit={handleSubmit} />;
}
