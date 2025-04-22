export default async function ProfilePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>프로필</h2>

        <div className='relative flex flex-col gap-2 rounded-md border lg:flex-row'>
          프사 + 이름, 전화번호, 나이
        </div>

        <div className='relative flex flex-col gap-2 rounded-md border lg:flex-row'>관심 분야</div>

        <div className='relative flex flex-col gap-2 rounded-md border lg:flex-row'>가입일</div>
      </section>
    </>
  );
}

// 프사 안하는지 물어보기
//

// 회원정보 수정 버튼 넣기
