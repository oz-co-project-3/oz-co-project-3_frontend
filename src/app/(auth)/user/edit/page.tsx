'use client';

import { useEffect, useState, useRef } from 'react';
import SeekerProfileForm from '@/components/common/seekerProfileForm';
import { SeekerFormData } from '@/types/user';

export default function SeekerEditPage() {
  const [userData, setUserData] = useState<Partial<SeekerFormData>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 사용자 정보를 API로 불러오깅
    const fetchUserInfo = async () => {
      try {
        const res = await fetch('/api/user/profile');
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (formData: SeekerFormData) => {
    console.log('📝 회원정보 수정 요청:', formData);

    try {
      const data = new FormData();

      // formData에서 각 필드 추가
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => data.append(key, v));
        } else if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });

      // 이미지 파일 추가
      if (fileInputRef.current?.files?.[0]) {
        data.append('profile_image', fileInputRef.current.files[0]);
      }

      const res = await fetch('/api/user/profile', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('회원정보 수정 실패');
      alert('회원정보가 성공적으로 수정되었습니다!');
    } catch (err) {
      alert('회원정보 수정 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <main className="px-4 py-10">
      <SeekerProfileForm type="edit" defaultValues={userData} onSubmit={handleSubmit} />
    </main>
  );
}
