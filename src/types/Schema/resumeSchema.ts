import { z } from 'zod';

export const resumeSchemaRequest = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  visibility: z.boolean(), // 디폴트는 비공개, 선택지 없음, 요청 보내는곳에서 공개로 변경
  name: z.string().min(1, '이름은 필수입니다.'),
  phone_number: z
    .string()
    .max(13, '너무 긴 전화번호입니다.')
    .regex(/^01[0-9]-[0-9]{4}-[0-9]{4}$/, '01로 시작하는 11자리 숫자여야 합니다.'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  img_url: z
    .union([z.literal(''), z.string().url('이미지 링크는 올바른 URL이어야 합니다.')])
    .optional(),
  interests: z.string().optional(),
  desired_area: z.string().min(1, '관심 지역은 필수입니다.'),
  education: z.enum(['박사', '석사', '대학원', '대학교', '전문대학', '고등학교']).optional(), // 최종 학력 (셀렉트)
  school_name: z.string().optional(),
  graduation_status: z.enum(['졸업', '재학', '휴학', '중퇴']).optional(), // 졸업 여부 (셀렉트)
  introduce: z.string().min(1, '자기소개는 필수입니다.'),
  status: z.enum(['작성중', '구직중', '완료']), // 디폴트는 작성중, 선택지는 없음, 요청 보내는곳에서 구직중으로 변경
  document_url: z
    .union([z.literal(''), z.string().url('포트폴리오 링크는 올바른 URL이어야 합니다.')])
    .optional(),
  work_experiences: z
    .array(
      z.object({
        company: z.string().min(1, '회사명은 필수입니다.'),
        period: z
          .string()
          .regex(
            /^(19|20)\d{2}\.(0[1-9]|1[0-2]) - (19|20)\d{2}\.(0[1-9]|1[0-2])$/,
            'YYYY.MM - YYYY.MM',
          )
          .min(1, '근무 기간은 필수입니다.'),
        position: z.string().min(1, '직무는 필수입니다.'),
      }),
    )
    .optional(),
});

export const resumeSchemaUpdate = resumeSchemaRequest.partial();

export type ResumeRequest = z.infer<typeof resumeSchemaRequest>;
export type ResumeUpdate = z.infer<typeof resumeSchemaUpdate>;
export type ResumeResponse = Omit<ResumeRequest, 'work_experiences'> & {
  id: number;
  user: {
    id: number;
  };
  work_experiences: {
    id: number;
    resume_id: number;
    company: string;
    period: string;
    position: string;
  }[];
  created_at: string;
  updated_at: string;
};

export type ResumeListResponse = {
  total: number;
  offset: number;
  limit: number;
  data: ResumeResponse[];
};
