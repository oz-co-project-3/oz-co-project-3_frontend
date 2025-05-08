'use client';

import { useEffect, useState } from 'react';
import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import { SeekerFormData } from '@/types/user';
import { fetchUserProfile } from '@/api/user';
import { convertArrayFieldsToString } from '@/lib/stringArrayConverter';

export default function SeekerEditPage() {
  const [initialData, setInitialData] = useState<Partial<SeekerFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        if (!profile) throw new Error('프로필 데이터를 가져올 수 없습니다.');
        const { base, seeker } = profile;

        if (!seeker) {
          throw new Error('구직자 정보가 없습니다.');
        }

        const parsed = {
          ...seeker,
          email: base.email,
          gender: base.gender,
          interests: seeker.interests,
          purposes: seeker.purposes,
          sources: seeker.sources,
        };

        setInitialData(parsed);
      } catch (err) {
        console.error('프로필 불러오기 실패:', err);
        alert('회원 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = (data: { [key: string]: unknown }) => {
    const cleaned = convertArrayFieldsToString(data as unknown as SeekerFormData);
    console.log('📝 회원정보 수정', cleaned);
    // TODO: 서버로 수정 요청 보내기
  };

  if (loading) return <p className='py-10 text-center'>불러오는 중...</p>;
  if (!initialData) return <p className='py-10 text-center text-red-500'>불러오기 실패</p>;

  return (
    <main className='px-4 py-10'>
      <SeekerProfileForm type='edit' defaultValues={initialData} onSubmit={handleSubmit} />
    </main>
  );
}
