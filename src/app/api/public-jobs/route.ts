import { NextRequest, NextResponse } from 'next/server';
import { PublicJobPosting, PublicJobPostingResponse } from '@/types/publicJob';

interface ApiError extends Error {
  status?: number;
}

const OPTIONS = ['시니어', '실버', '노인', '중장년'] as const;

// 인메모리 캐시
let cachedPublicJobs: PublicJobPosting[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION_MS = 1000 * 60 * 60 * 24; // 24시간

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offsetParam = searchParams.get('offset');
  const limitParam = searchParams.get('limit');
  const idParam = searchParams.get('id');
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
  const limit = limitParam ? parseInt(limitParam, 10) : 10;

  // 유효성 검사
  if (isNaN(offset) || offset < 0) {
    return NextResponse.json({ error: '유효하지 않은 offset 값입니다. (0 이상)' }, { status: 400 });
  }
  if (isNaN(limit) || limit <= 0 || limit > 30) {
    // 페이지당 최대 30개 까지만
    return NextResponse.json({ error: '유효하지 않은 limit 값입니다. (1 ~ 30)' }, { status: 400 });
  }

  // 캐시 확인
  const now = Date.now();
  if (cachedPublicJobs && lastFetchTime && now - lastFetchTime < CACHE_DURATION_MS) {
    console.log('캐시된 데이터 사용하기');
    const paginatedPublicJobs = cachedPublicJobs.slice(offset, offset + limit);
    const totalItems = cachedPublicJobs.length;

    // 공고 상세 조회
    if (idParam) {
      const job = cachedPublicJobs.find((job) => job.id === parseInt(idParam));
      if (!job) {
        return NextResponse.json({ error: '존재하지 않는 공고입니다.' }, { status: 404 });
      }
      return NextResponse.json({ data: job });
    }

    // 공고 목록 조회
    return NextResponse.json(
      {
        total: totalItems,
        offset,
        limit,
        data: paginatedPublicJobs,
      },
      { status: 200 },
    );
  }

  console.log('새로운 데이터 가져오기');
  try {
    const publicJobsPackages = await Promise.all(
      OPTIONS.map(async (option) => {
        const params = new URLSearchParams({
          // 어차피 무료 오픈 API니까, 환경변수로 빼지 않음 (그래도 넣어야하나?)
          serviceKey:
            'wegLdJbuHNke8Bf+CCJQxf1x9B6yBofoEc9wFxjGxT+NcGEg1F/JgmGCQbWrVwHBneeGzdYVutBWxRcZx5jaAg==',
          numOfRows: '100',
          recrutPbancTtl: option,
        });

        const response = await fetch(`https://apis.data.go.kr/1051000/recruitment/list?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage =
            errorData.message ||
            `공공 데이터 포탈 API 호출 실패: ${response.status} ${response.statusText}`;
          console.error(`공공 데이터 포탈 API 호출 오류 (${response.status}):`, errorData);

          const error: ApiError = new Error(`공공 데이터 포탈 API 호출 오류: ${errorMessage}`);
          error.status = response.status;
          throw error;
        }

        return response.json();
      }),
    );

    // 모든 result 배열 펼쳐서 합치기
    const mergedResults: PublicJobPostingResponse[] = publicJobsPackages.flatMap(
      (pkg) => pkg.result ?? [],
    );

    // 공고 목록 데이터 다듬기
    const publicJobs: PublicJobPosting[] = mergedResults
      .map((result, index) => ({
        id: index,
        title: result.recrutPbancTtl,
        company: result.instNm,
        job: result.ncsCdNmLst,
        position: result.recrutSeNm,
        employmentType: result.hireTypeNmLst,
        location: result.workRgnNmLst,
        qualification: result.aplyQlfcCn,
        disqualification: result.disqlfcRsn,
        education: result.acbgCondNmLst,
        preference: result.prefCondCn,
        preferenceDetail: result.prefCn,
        hiringProcess: result.scrnprcdrMthdExpln,
        postedAt: result.pbancBgngYmd,
        deadline: result.pbancEndYmd,
        url: result.srcUrl,
      }))
      .sort(
        (a, b) =>
          new Date(parseInt(b.postedAt)).getTime() - new Date(parseInt(a.postedAt)).getTime(),
      );

    // 캐시 업데이트
    cachedPublicJobs = publicJobs;
    lastFetchTime = now;
    console.log('데이터 캐시됨');

    const paginatedPublicJobs = publicJobs.slice(offset, offset + limit);
    const totalItems = publicJobs.length;

    // 공고 상세 조회
    if (idParam) {
      const job = publicJobs.find((job) => job.id === parseInt(idParam));
      if (!job) {
        return NextResponse.json({ error: '존재하지 않는 공고입니다.' }, { status: 404 });
      }
      return NextResponse.json({
        data: job,
      });
    }

    // 공고 목록 조회
    return NextResponse.json(
      {
        total: totalItems,
        offset,
        limit,
        data: paginatedPublicJobs,
      },
      { status: 200 },
    );

    // 에러 처리
  } catch (error) {
    console.error('API 라우트 핸들러 오류:', error);

    if (error instanceof Error) {
      const apiError = error as ApiError;
      if (typeof apiError.status === 'number' && typeof apiError.message === 'string') {
        return NextResponse.json({ error: apiError.message }, { status: apiError.status });
      }
    }

    // TypeError: Failed to fetch 와 같은 네트워크 관련 에러 처리
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return NextResponse.json({ error: '네트워크 연결 요청 실패' }, { status: 503 });
    }

    return NextResponse.json({ error: '내부 서버 오류' }, { status: 500 });
  }
}

// 에러 클래스 정의해서 처리하는 방식으로 리팩토링 해보기
