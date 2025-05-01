import { z } from 'zod';

export const jobPostingSchema = z.object({
  id: z.number().optional(),
  user: z
    .object({
      id: z.number(),
    })
    .optional(),
  company: z.string(), // 프로필의 회사명 받아서 넣어주거나, 공고 조회시에만 회사명 개업일자 회사소개 넣어주기
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
  view_count: z.number().int().min(0).optional(),
  report: z.number().int().min(0).optional(),
});

// education -> qualification 으로 바꾸기? (자격요건)

// 최대 글자수 넣어주기

// 스웨거에 3개 빠짐
// image_url, updated_at, created_at, agreed_terms

// 테이블 명세서에 1개 없음
// company

// 유주님이 정의한 타입에 detailPagePath 는 빼고 인자 나눠서 전달하라고 얘기하기

export type JobPostingSchema = z.infer<typeof jobPostingSchema>;
