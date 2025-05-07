'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserTable } from './UserTable';

export function UserTabs() {
  const [tab, setTab] = useState('seeker');

  return (
    <div className='p-50 pt-20 pb-20'>
      <h2 className='p-2 text-xl font-bold'>전체 회원 목록</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='seeker'>개인회원</TabsTrigger>
          <TabsTrigger value='business'>기업회원</TabsTrigger>
        </TabsList>

        <TabsContent value='seeker'>
          <UserTable userType='seeker' />
        </TabsContent>

        <TabsContent value='business'>
          <UserTable userType='business' />
        </TabsContent>
      </Tabs>
    </div>
  );
}
