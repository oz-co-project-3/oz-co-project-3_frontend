import SkeletonPlaceholder from '@/components/common/SkeletonPlaceholder';

export default async function Loading() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-2 text-2xl font-bold'>프로필</h2>
        <SkeletonPlaceholder variant='profile' />
        <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
          <div>회원 탈퇴하기</div>
          <div>회원정보 수정</div>
        </div>
      </section>
    </>
  );
}
