export interface User {
  id: number;
}

export interface JobPosting {
  id: number;
  user: User;
  company: string;
  title: string;
  location: string;
  employment_type: string; //
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
}

export interface JobPostingListResponse {
  total: number;
  offset: number;
  limit: number;
  data: JobPosting[];
}
