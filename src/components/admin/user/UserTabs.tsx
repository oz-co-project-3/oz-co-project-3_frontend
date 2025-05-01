'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserTable } from './UserTable';

export function UserTabs() {
  const [tab, setTab] = useState('personal');

  return (
    <div className='p-50 pt-20 pb-20'>
      <h2 className='p-2 text-xl font-bold'>전체 회원 목록</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='personal'>개인회원</TabsTrigger>
          <TabsTrigger value='corporate'>기업회원</TabsTrigger>
        </TabsList>

        <TabsContent value='personal'>
          <UserTable userType='personal' />
        </TabsContent>

        <TabsContent value='corporate'>
          <UserTable userType='corporate' />
        </TabsContent>
      </Tabs>
    </div>
  );
}
