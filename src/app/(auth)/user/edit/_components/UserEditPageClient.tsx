'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';

import { fetchUserProfile, updateSeekerProfile, updateBusinessProfile } from '@/api/user';
import { CorpProfile, CompanyFormData, SeekerFormData } from '@/types/user';
import useSWR from 'swr';
import { useAuthStore } from '@/store/useAuthStore';
import dayjs from 'dayjs';

export default function UserEditPageClient() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<string[]>([]);
  const [defaultSeeker, setDefaultSeeker] = useState<SeekerFormData | null>(null);
  const [defaultCompany, setDefaultCompany] = useState<CorpProfile | null>(null);
  const [tab, setTab] = useState<'seeker' | 'company'>(
    searchParams.get('tab') === 'company' ? 'company' : 'seeker',
  );
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { mutate } = useSWR('/api/user/profile/', fetchUserProfile);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await fetchUserProfile();
        if (!profile) return;

        const { base, seeker, corp } = profile;
        setUserType(base.user_type.split(','));

        if (seeker) {
          setDefaultSeeker({
            ...seeker,
            email: base.email,
            gender: base.gender as 'male' | 'female',
            interests: seeker.interests.split(','),
            purposes: seeker.purposes.split(','),
            sources: seeker.sources.split(','),
            user_type: 'normal',
            profile_url: seeker.profile_url,
          });
        }

        if (corp) {
          const formattedDate = corp.business_start_date
            ? dayjs(corp.business_start_date).format('YYYY-MM-DD')
            : '';

          setDefaultCompany({
            ...corp,
            business_start_date: formattedDate,
          });
        }
      } catch (err) {
        console.error('프로필 불러오기 실패:', err);
      }
    };

    loadData();
  }, []);

  const handleSeekerSubmit = async (data: { [key: string]: unknown }) => {
    const cleaned = {
      ...data,
      gender: data.gender,
      profile_url: data.profile_url || undefined,
    };
    console.log('수정 요청 데이터:', cleaned);

    try {
      await updateSeekerProfile(cleaned);
      await mutate();

      const profile = await fetchUserProfile();
      if (!profile) return;
      const { base, seeker, corp } = profile;

      setUser({
        id: Number(base.id),
        email: base.email,
        name: seeker?.name ?? corp?.manager_name ?? '',
        user_type: base.user_type,
        signinMethod: base.signinMethod as 'email' | 'naver' | 'kakao',
      });

      setShowSuccessDialog(true);
    } catch (err) {
      console.error('Seeker 수정 실패:', err);
      alert('회원정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCompanySubmit = async (data: CompanyFormData) => {
    try {
      await updateBusinessProfile(data as unknown as Record<string, unknown>);
      await mutate();

      const profile = await fetchUserProfile();
      if (!profile) return;
      const { base, seeker, corp } = profile;

      setUser({
        id: Number(base.id),
        email: base.email,
        name: seeker?.name ?? corp?.manager_name ?? '',
        user_type: base.user_type,
        signinMethod: base.signinMethod as 'email' | 'naver' | 'kakao',
      });

      setShowSuccessDialog(true);
    } catch (err) {
      console.error('Company 수정 실패:', err);
      alert('회원정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCompanyTabClick = () => {
    if (!userType.includes('business')) {
      setShowUpgradeDialog(true);
    } else {
      setTab('company');
    }
  };

  const handleSuccessConfirm = async () => {
    setShowSuccessDialog(false);
    const profile = await fetchUserProfile();
    if (!profile) return;
    const { base, seeker, corp } = profile;

    setUser({
      id: Number(base.id),
      email: base.email,
      name: seeker?.name ?? corp?.manager_name ?? '',
      user_type: base.user_type,
      signinMethod: base.signinMethod as 'email' | 'naver' | 'kakao',
    });
  };

  return (
    <main className='px-4 py-10'>
      <Tabs value={tab} onValueChange={(value) => setTab(value as 'seeker' | 'company')}>
        <TabsList className='mb-4'>
          <TabsTrigger
            value='seeker'
            className='data-[state=active]:bg-main-light border-main-light rounded-md border px-6 py-2 text-base data-[state=active]:text-white'
          >
            일반 회원
          </TabsTrigger>
          <TabsTrigger
            value='company'
            className='data-[state=active]:bg-main-light border-main-light rounded-md border px-6 py-2 text-base data-[state=active]:text-white'
            onClick={handleCompanyTabClick}
          >
            기업 회원
          </TabsTrigger>
        </TabsList>

        <TabsContent value='seeker'>
          {defaultSeeker ? (
            <SeekerProfileForm
              type='edit'
              defaultValues={defaultSeeker}
              onSubmit={handleSeekerSubmit}
            />
          ) : (
            <p>일반 회원 정보가 없습니다.</p>
          )}
        </TabsContent>

        <TabsContent value='company'>
          {userType.includes('business') && defaultCompany ? (
            <CompanyProfileForm
              type='edit'
              defaultValues={defaultCompany}
              onSubmit={handleCompanySubmit}
            />
          ) : null}
        </TabsContent>
      </Tabs>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>기업회원 업그레이드가 필요합니다</DialogTitle>
          </DialogHeader>
          <p className='mt-4 text-center'>
            기업 회원 수정을 위해서는 기업 인증이 필요합니다. 인증 페이지로 이동하시겠습니까?
          </p>
          <DialogFooter
            className='mt-6 flex flex-col gap-2'
            style={{ flexDirection: 'column', alignItems: 'stretch' }}
          >
            <Button
              className='bg-main-light w-full text-white'
              onClick={() => router.push('/user/register-company')}
            >
              네, 이동할게요
            </Button>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => {
                setShowUpgradeDialog(false);
                setTab('seeker');
              }}
            >
              아니요, 일반 회원 정보만 수정할게요
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>회원정보 수정 완료</DialogTitle>
          </DialogHeader>
          <p className='mt-4 text-center'>회원정보가 성공적으로 수정되었어요 🎉</p>
          <DialogFooter className='mt-6 flex justify-center'>
            <Button onClick={handleSuccessConfirm}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
