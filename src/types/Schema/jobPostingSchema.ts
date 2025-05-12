import { z } from 'zod';

export const jobPostingSchemaRequest = z.object({
  company: z.string().min(1, '회사명은 필수입니다.'),
  title: z.string().min(1, '제목은 필수입니다.'),
  location: z.string().min(1, '위치는 필수입니다.'),
  employment_type: z.enum(['공공', '일반']),
  employ_method: z.enum(['정규직', '계약직', '일용직', '프리랜서', '파견직']),
  work_time: z.string().min(1, '근무 시간은 필수입니다.'),
  position: z.string().min(1, '직무는 필수입니다.'),
  history: z.string().optional(),
  recruitment_count: z
    .number()
    .int('자연수를 입력하세요.')
    .min(0, '모집 인원은 0 이상이어야 합니다.'),
  education: z.string().transform((val) => (val === '' ? '없음' : val)),
  deadline: z.string().min(1, '채용 마감일은 필수입니다.'),
  salary: z.string().transform((val) => (val === '' ? '협의 후 결정' : val)),
  summary: z.string().optional(),
  description: z.string(), // 필수 항목으로 처리하는 방법 고민하기
  status: z.enum(['모집중', '마감 임박', '모집 종료', '블라인드', '대기중', '반려됨']),
  career: z.enum(['경력무관', '신입', '경력직']),
  image_url: z.string().optional(),
});

export const jobPostingSchemaUpdate = jobPostingSchemaRequest.partial();

export type JobPostingRequest = z.infer<typeof jobPostingSchemaRequest>;
export type JobPostingUpdate = z.infer<typeof jobPostingSchemaUpdate>;
export type JobPostingResponse = JobPostingRequest & {
  id: string;
  user: {
    id: string;
  };
  view_count: number;
  report: number;
  created_at: string;
  updated_at: string;
  is_bookmarked: boolean;
};

// 동적 라우트 파라미터는 항상 string이라 id에서 오류 계속 발생해 string으로 변경했습니다-유주
export type JobPostingListResponse = {
  total: number;
  offset: number;
  limit: number;
  data: JobPostingResponse[];
};

// reject_postings 필드까지 포함한 관리자 테이블/상세용 타입
export type JobPostingWithRejects = JobPostingResponse & {
  reject_postings: {
    id: number;
    user: { id: number };
    content: string;
  }[];
};

export type FavoriteJobPosting = Pick<
  JobPostingResponse,
  'company' | 'employ_method' | 'id' | 'image_url' | 'title' | 'location' | 'deadline'
>;

// id -> job_posting_id
export type AppliedJobPosting = Pick<
  JobPostingResponse,
  | 'title'
  | 'company'
  | 'position'
  | 'location'
  | 'image_url'
  | 'deadline'
  | 'created_at'
  | 'updated_at'
> & {
  job_posting_id: JobPostingResponse['id'];
  id: number;
  user_id: number;
  resume: {
    id: number;
    title: string;
    name: string;
    email: string;
  };
  memo: string;
  status: '지원 중' | '지원 취소';
};

// 최대 글자수 넣어주기
