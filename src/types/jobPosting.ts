export interface User {
  id: string;
}

export interface JobPosting {
  id: string;
  user: User;
  company: string;
  title: string;
  location: string;
  employment_type: string;
  employ_method: string;
  work_time: string;
  position: string;
  history: string;
  recruitment_count: number;
  education: string;
  deadline: string;
  salary: string;
  summary: string;
  description: string;
  status: string;
  view_count: number;
  report: number;
  detailPagePath: string; // 타입에 넣지말고, 인자 전달할때 분리해서 전달해야한다고 얘기하기
}

export interface JobPostingListResponse {
  total: number;
  offset: number;
  limit: number;
  data: JobPosting[];
}
