import { z } from 'zod';

export const jobPostingSchemaRequest = z.object({
  company: z.string(),
  // .min(1, '회사명은 필수입니다.'),
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
  // 테이블에 이미 있는거 추가하기
  // career: z.string().default('경력 무관'),
  // image_url: z.string().url(),
});

export const jobPostingSchemaUpdate = jobPostingSchemaRequest.partial();

// education -> qualification 으로 바꾸기? (자격요건)

// 최대 글자수 넣어주기

// 스웨거에 3개 빠짐
// image_url, updated_at, created_at, agreed_terms (이건 없앤듯)

// 테이블 명세서에 1개 없음
// company

// 유주님이 정의한 타입에 detailPagePath 는 빼고 인자 나눠서 전달하라고 얘기하기

export type JobPostingRequest = z.infer<typeof jobPostingSchemaRequest>;
export type JobPostingUpdate = z.infer<typeof jobPostingSchemaUpdate>;
export type JobPostingResponse = JobPostingRequest & {
  id: number;
  user: {
    id: number;
  };
  view_count: number;
  report: number;
  created_at: string;
  updated_at: string;
};
