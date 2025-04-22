export default async function CompanyDashboardPage() {
  return (
    <>
      <p>/company-dashboard/profile 로 리다이렉트</p>
      <p>유저 정보 확인 후 개인이면 /dashboard/profile 로 리다이렉트</p>
    </>
  );
}

// 개인이냐 기업이냐에 따라서 렌더링할 컴포넌트 분리
