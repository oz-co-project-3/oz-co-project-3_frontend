// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DataTable from '../table/DataTable';
// import { getColumns } from './columns';
// import { AdminUser } from '@/types/user';
// import { useAuthStore } from '@/store/useAuthStore';
// import { ResumeModal } from '../resume/ResumeModal';

// interface UserTableProps {
//   userType: 'seeker' | 'business'; // 사용자 유형 (개인 또는 기업)
// }

// // 응답 객체에서 AdminUser 배열 추출
// function extractAdminUsers(response: unknown): AdminUser[] {
//   if (Array.isArray(response)) {
//     return response as AdminUser[];
//   }
//   return [];
// }

// export function UserTable({ userType }: UserTableProps) {
//   // 전체 사용자 목록 상태
//   const [data, setData] = useState<AdminUser[]>([]);

//   // 로딩 상태
//   const [isLoading, setIsLoading] = useState(true);

//   // 모달 오픈 시 선택된 유저 ID
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

//   const router = useRouter();
//   //const accessToken = useAuthStore((state) => state.accessToken);
//   const logout = useAuthStore((state) => state.logout);

  // 사용자 목록 조회 API
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setIsLoading(true);

  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/admin/user`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           //Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       // 인증 만료 시 로그아웃 처리
  //       if (res.status === 401) {
  //         logout();
  //         router.push('/user/login');
  //         return;
  //       }

  //       const result = await res.json();
  //       const users = extractAdminUsers(result);

  //       // 사용자 유형에 따라 필터링 + 관리자(admin) 제외
  //       const filtered = users.filter((user) => {
  //         const isTarget =
  //           userType === 'seeker' ? !!user.seeker : userType === 'business' ? !!user.corp : false;

  //         // user_type이 문자열로 와서 admin 포함되는지 체크
  //         const isAdmin = user.base.user_type.includes('admin');

  //         return isTarget && !isAdmin;
  //       });
  //       setData(filtered);
  //     } catch (error) {
  //       console.error('회원 목록 실패:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // 액세스 토큰이 있을 때만 요청
  //   if (accessToken) fetchUsers();
  // }, [userType, accessToken, router, logout]);

//   // 로딩 중 화면
//   if (isLoading) {
//     return (
//       <div className='flex h-64 items-center justify-center'>
//         <p className='text-gray-400'>로딩 중...</p>
//       </div>
//     );
//   }

//   // 사용자 테이블, 이력서 모달 렌더링
//   return (
//     <div className='mt-4'>
//       <DataTable columns={getColumns(router, (id) => setSelectedUserId(id))} data={data} />

//       {selectedUserId !== null && (
//         <ResumeModal userId={selectedUserId} open={true} onClose={() => setSelectedUserId(null)} />
//       )}
//     </div>
//   );
// }
