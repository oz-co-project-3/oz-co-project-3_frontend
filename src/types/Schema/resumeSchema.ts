import { z } from 'zod';

export const resumeSchemaRequest = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  visibility: z.boolean(), // 디폴트는 비공개, 선택지 없음, 요청 보내는곳에서 공개로 변경
  name: z.string().min(1, '이름은 필수입니다.'),
  phone_number: z.string().regex(/^01[0-9]{9}$/, '01로 시작하는 11자리 숫자여야 합니다.'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  img_url: z
    .union([z.literal(''), z.string().url('이미지 링크는 올바른 URL이어야 합니다.')])
    .optional(),
  interests: z.string().optional(),
  desired_area: z.string().min(1, '관심 지역은 필수입니다.'),
  education: z.enum(['박사', '석사', '대학원', '대학교', '전문대학', '고등학교']).optional(), // 최종 학력 (셀렉트)
  school_name: z.string().optional(),
  graduation_status: z.string().optional(), // 졸업 여부 (셀렉트)
  introduce: z.string().min(1, '자기소개는 필수입니다.'),
  status: z.enum(['작성중', '구직중', '완료']), // 디폴트는 작성중, 선택지는 없음, 요청 보내는곳에서 구직중으로 변경
  document_url: z
    .union([z.literal(''), z.string().url('포트폴리오 링크는 올바른 URL이어야 합니다.')])
    .optional(),
  work_experience: z
    .array(
      z.object({
        resume_id: z.number(), // 알아서 넣어주는데 굳이 필수값으로 받아야할 이유가 없음.
        company: z.string(),
        period: z.string(),
        position: z.string(), // 직무
        // 직급, 업무 경험 및 성과
      }),
    )
    .optional(),
});

// 업데이트용
export const resumeSchemaUpdate = resumeSchemaRequest.partial();

// 타입 파일에서 스키마 없이 타입만 다시 정의하기
export const resumeSchemaResponse = resumeSchemaRequest.extend({
  id: z.number(),
  user: z.object({
    id: z.number(),
  }),
  work_experience: z.array(
    z.object({
      id: z.number(),
      resume_id: z.number(),
      company: z.string(),
      period: z.string(),
      position: z.string(),
      // 직급, 업무 경험 및 성과
    }),
  ),
});

export type ResumeRequest = z.infer<typeof resumeSchemaRequest>;
export type ResumeUpdate = z.infer<typeof resumeSchemaUpdate>;
