export default function Loading() {
  return (
    <div className='w-full'>
      <div className='mt-8 flex justify-center'>
        <div className='flex items-center space-x-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700'></div>
          <div className='text-main text-lg font-medium'>데이터를 불러오는 중입니다...</div>
        </div>
      </div>

      <div className='animate-pulse'>
        {/* 헤더 부분 */}
        <div className='flex flex-row justify-between border-b-2 bg-white py-2'>
          <div className='h-6 w-[150px] rounded bg-gray-200'></div>
          <div className='h-6 w-[300px] rounded bg-gray-200'></div>
          <div className='h-6 w-[300px] rounded bg-gray-200'></div>
          <div className='h-6 w-[150px] rounded bg-gray-200'></div>
          <div className='h-6 w-[280px] rounded bg-gray-200'></div>
        </div>

        {/* 리스트 아이템 */}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className='my-2 flex flex-row justify-between border-b-2 bg-white py-2'
            >
              {/* 근무지 */}
              <div className='flex h-16 w-[150px] items-center justify-center'>
                <div className='h-5 w-[100px] rounded bg-gray-200'></div>
              </div>

              {/* 모집제목/기업명 */}
              <div className='flex h-16 w-[300px] flex-col items-center justify-center space-y-2'>
                <div className='h-5 w-[200px] rounded bg-gray-200'></div>
                <div className='h-4 w-[150px] rounded bg-gray-200'></div>
              </div>

              {/* 근무요약 */}
              <div className='flex h-16 w-[300px] items-center justify-center'>
                <div className='h-5 w-[250px] rounded bg-gray-200'></div>
              </div>

              {/* 근무형태 */}
              <div className='flex h-16 w-[150px] items-center justify-center'>
                <div className='h-5 w-[80px] rounded bg-gray-200'></div>
              </div>

              {/* 마감일 */}
              <div className='flex h-16 w-[280px] items-center justify-center'>
                <div className='h-5 w-[150px] rounded bg-gray-200'></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
