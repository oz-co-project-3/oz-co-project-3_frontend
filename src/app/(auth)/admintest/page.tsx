import AdminOnlyModalGuard from '@/components/common/modals/AdminOnlyModalGuard';

export default function AdminTestPage() {
  return (
    <AdminOnlyModalGuard>
      <div className="p-8 text-center text-xl font-semibold">
        🎉 관리자 전용 테스트 페이지입니다.
      </div>
    </AdminOnlyModalGuard>
  );
}
