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

import SeekerProfileForm from '@/components/common/userForms/seekerProfileForm';
import CompanyProfileForm from '@/components/common/userForms/companyProfileForm';

import { fetchUserProfile } from '@/api/user';
import { convertArrayFieldsToString } from '@/lib/stringArrayConverter';
import { useRouter } from 'next/navigation';
import { SeekerFormData, CompanyFormData } from '@/types/user';

export default function UserEditPage() {
  const [userType, setUserType] = useState<string[]>([]);
  const [defaultSeeker, setDefaultSeeker] = useState<SeekerFormData | null>(null);
  const [defaultCompany, setDefaultCompany] = useState<CompanyFormData | null>(null);
  const [tab, setTab] = useState<'seeker' | 'company'>('seeker');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

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
            gender: base.gender,
            interests: seeker.interests,
            purposes: seeker.purposes,
            sources: seeker.sources,
            password: '',
            password_check: '',
            user_type: 'normal',
          });
        }

        if (corp) {
          setDefaultCompany({
            ...corp,
          });
        }
      } catch (err) {
        console.error('프로필 불러오기 실패:', err);
      }
    };

    loadData();
  }, []);

  const handleSeekerSubmit = (data: { [key: string]: unknown }) => {
    const cleaned = convertArrayFieldsToString(data);
    console.log('📝 일반회원 수정:', cleaned);
  };

  const handleCompanySubmit = (data: CompanyFormData) => {
    console.log('📝 기업회원 수정:', data);
  };

  const handleCompanyTabClick = () => {
    if (!userType.includes('business')) {
      setShowUpgradeDialog(true);
    } else {
      setTab('company');
    }
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

      {/* 기업회원 업그레이드 안내 모달 */}
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
    </main>
  );
}
