import { NextRequest, NextResponse } from 'next/server';
import { PublicJobPosting, PublicJobPostingResponse } from '@/types/publicJob';

interface ApiError extends Error {
  status?: number;
}

const OPTIONS = ['시니어', '실버', '노인', '중장년'] as const;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offsetParam = searchParams.get('offset');
  const limitParam = searchParams.get('limit');

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

  try {
    const publicJobsPackages = await Promise.all(
      OPTIONS.map(async (option) => {
        const params = new URLSearchParams({
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

    // 모든 result 배열을 합치기
    const mergedResults: PublicJobPostingResponse[] = publicJobsPackages.flatMap(
      (pkg) => pkg.result ?? [],
    );

    const publicJobs: PublicJobPosting[] = mergedResults.map((result) => ({
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
    }));

    const paginatedPublicJobs = publicJobs.slice(offset, offset + limit);
    const totalItems = publicJobs.length;

    return NextResponse.json(
      {
        total: totalItems,
        offset,
        limit,
        data: paginatedPublicJobs,
      },
      { status: 200 },
    );

    // 에러
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
