export default async function CompanyProfile({ id }: { id?: Promise<string> }) {
  const userId = await id;
  console.log('기업유저 id: ', userId);

  // id가 있으면 어드민의 조회, undefined면 유저의 조회

  return (
    <>
      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>회사명</span>
          <span>넥스트러너스</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>사업자 등록 번호</span>
          <span>000-00-00000</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>회사 개업일</span>
          <span>2025-01-01</span>
        </div>
        <div className='flex flex-col gap-2 border-b pb-4'>
          <span className='font-bold'>회사 소개</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut culpa, natus
            repellendus voluptatem architecto consequatur obcaecati adipisci pariatur error
            accusantium aliquid ipsa quaerat, possimus, non alias ullam. Hic, iure. Consequatur
            impedit atque blanditiis maxime at? Ea ducimus voluptas odio consequatur aspernatur,
            quam nulla provident sit perspiciatis culpa velit et facere deleniti beatae atque id,
            saepe exercitationem laudantium at pariatur? Vitae doloremque autem mollitia quia maxime
            odit omnis? Vel, culpa quasi, nobis ipsam explicabo impedit fuga iste atque architecto
            modi sequi deserunt illo numquam. Fugit ex id quod quia minus. Eaque quo tempora quam
            debitis. Beatae reprehenderit aut quae, sunt a odit quod fuga molestiae dolorem suscipit
            architecto laborum officiis recusandae at placeat, nulla soluta assumenda tempora
            excepturi alias fugiat. Voluptates eaque iste adipisci. Facilis eligendi ex ipsa,
            architecto repellat neque! Voluptate esse, officia nesciunt delectus laboriosam deleniti
            eveniet dolor error ratione, totam laudantium consequuntur, provident et! Fuga,
            voluptatibus corporis?
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 이름</span>
          <span>김오즈</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 전화번호</span>
          <span>010-0000-0000</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 이메일</span>
          <span>oz-8-frontend@nextrunners.com</span>
        </div>
      </div>
    </>
  );
}
