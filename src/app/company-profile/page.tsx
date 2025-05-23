import Link from 'next/link';

export default async function CompanyProfilePage() {
  return (
    <div className='mx-auto max-w-[1400px] px-4 py-10'>
      {/* 비전 섹션 */}
      <section className='mb-20 py-10'>
        <h1 className='text-main mb-10 text-center text-4xl font-bold'>
          더 나은 시니어의 삶을 함께 만들어갑니다
        </h1>
        <div className='mx-auto max-w-3xl'>
          <p className='mb-6 text-center text-xl leading-relaxed text-gray-700'>
            경험과 가치를 이어가는 새로운 일자리 매칭으로 세상에 없던 시니어 중심 커리어 플랫폼을
            만들어 나가고 있어요.
          </p>
        </div>
      </section>

      {/* 미션 섹션 */}
      <section className='mb-16 rounded-xl bg-green-50 p-10'>
        <div className='mx-auto max-w-3xl'>
          <p className='mb-6 text-lg leading-relaxed text-gray-700'>
            퇴직은 끝이 아니라, 새로운 시작이 될 수 있습니다. 우리는 시니어 세대가 다시 사회에서
            필요한 사람으로 자리 잡을 수 있도록 함께합니다. 하지만 현실은 녹록지 않습니다.
            중장년층이 일을 다시 시작하고 싶어도 어디서부터 시작해야 할지 막막할 때가 많습니다.
          </p>
          <p className='mb-6 text-lg leading-relaxed text-gray-700'>
            오랜 경험과 뛰어난 능력을 가진 분들도 적합한 일자리를 찾기 어렵고, 복잡한 지원 과정이나
            부족한 정보 때문에 소중한 기회를 놓치는 경우가 많습니다. 그래서 우리는 시니어 내일을
            만들었습니다.
          </p>
          <p className='text-main mb-6 text-center text-xl font-semibold'>
            &ldquo;시니어 세대가 다시 나를 되찾고, 일할 수 있도록 돕는 따뜻한 맞춤형 일자리
            플랫폼&rdquo;
          </p>
          <p className='text-lg leading-relaxed text-gray-700'>
            시니어 내일은 단순히 일자리를 연결하는 것을 넘어, 여러분의 경험과 능력을 존중하며 새로운
            내일을 열어갈 수 있도록 함께합니다. 퇴직 후의 삶이 더 풍요롭고 의미 있는 여정이 되도록,
            우리는 늘 곁에서 응원하겠습니다.
          </p>
        </div>
      </section>

      {/* 일하는 방식 섹션 */}
      <section className='mb-20'>
        <h2 className='text-main mb-2 text-center text-2xl font-bold'>시니어내일이 일하는 방식</h2>
        <p className='mb-10 text-center text-lg text-gray-600'>
          사용자 가치를 가장 중요하게 생각해요
        </p>

        <div className='grid gap-10 md:grid-cols-2'>
          <div className='rounded-lg bg-white p-8 shadow-md transition-transform hover:translate-y-[-5px]'>
            <h3 className='text-main mb-4 text-2xl font-bold'>일자리매칭</h3>
            <p className='leading-relaxed text-gray-700'>
              시니어 내일 플랫폼은 개인의 경험과 역량에 맞는 일자리를 연결해 드립니다. 다양한 직종과
              근무 형태의 정보를 제공하며, 개인별 선호도를 고려한 맞춤형 일자리 추천 시스템을 갖추고
              있습니다. 지원 과정에서 필요한 기본적인 도움을 제공하여 더 쉽게 일자리를 찾을 수
              있도록 지원합니다.
            </p>
          </div>
          <div className='rounded-lg bg-white p-8 shadow-md transition-transform hover:translate-y-[-5px]'>
            <h3 className='text-main mb-4 text-2xl font-bold'>커뮤니티</h3>
            <p className='leading-relaxed text-gray-700'>
              시니어 내일 커뮤니티는 비슷한 목표를 가진 중장년층이 함께 소통하고 정보를 나눌 수 있는
              공간입니다. 일상생활에 유용한 정보부터 구직 경험까지, 다양한 주제로 서로 도움을
              주고받을 수 있습니다. 온/오프라인 활동을 통해 인맥을 형성하고 새로운 기회를 발견할 수
              있도록 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 채용 섹션 */}
      <section className='mb-16 rounded-xl bg-gray-50 p-10 text-center'>
        <h2 className='text-main mb-6 text-3xl font-bold'>시니어내일과 함께 성장해보세요</h2>
        <div className='mt-8 flex justify-center'>
          <Link href='/'>
            <button className='bg-main-light hover:bg-main rounded-md px-6 py-3 text-white transition-colors'>
              채용공고 보러가기
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
