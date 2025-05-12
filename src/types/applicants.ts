export type ApplicantsResponse = {
  id: number;
  job_posting_id: number;
  user_id: number;
  resume: {
    id: number;
    name: string;
    email: string;
    title: string;
  };
  status: '지원 중' | '지원 취소';
  memo: string;
  created_at: string;
  updated_at: string;
};
