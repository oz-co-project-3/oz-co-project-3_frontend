import SearchBar from '@/components/common/searchbar/Searchbar';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <>
      <nav className='bg-white'>
        <SearchBar />
        <br />
        <hr />
      </nav>
      <div className='flex h-full justify-center pt-30'>
        <main className='max-w-[1400px] flex-row text-center'>
          <h1 className='text-3xl font-bold'>"내일 뭐하지? 시니어내일에서 찾아봐요!"</h1>
          <p className='mb-10 text-sm text-gray-700'>
            경험과 가치를 이어가는 새로운 일자리 매칭
            <br />
            지금 바로 시작하세요!
          </p>
          <SearchBar />
          <nav className='flex flex-row justify-center space-x-4 pt-10'>
            <div className='rounded-md border px-4 py-2 text-center'>공공일자리</div>
            <div className='rounded-md border px-4 py-2 text-center'>일반채용</div>
            <div className='rounded-md border px-4 py-2 text-center'>이력서</div>
            <div className='rounded-md border px-4 py-2 text-center'>커뮤니티</div>
          </nav>
          <p>검색 키워드 추천</p>
          <div className='mb-20 flex justify-center space-x-2'>
            <Button>경비</Button>
            <Button>사무보조</Button>
            <Button>IT개발</Button>
            <Button>디자인</Button>
            <Button>서비스</Button>
          </div>
          <h1 className='text-2xl font-bold'>최근에 등록된 공고</h1>
          {/* 로그인되면 추천 공고 뜨게 해야함 */}
          <div>추천공고 컴포넌트 뜨게 하기</div>
        </main>
      </div>
    </>
  );
}
