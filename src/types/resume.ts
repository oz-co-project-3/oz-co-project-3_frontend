export interface ResumeResponse {
  id: number;
  user: {
    id: number;
  };
  title: string;
  visibility: boolean;
  name: string;
  phone_number: string;
  email: string;
  image_profile: string;
  interests: string;
  desired_area: string;
  education: string;
  school_name: string;
  graduation_status: string;
  introduce: string;
  status: string;
  document_url: string;
  work_experiences: {
    id: number;
    company: string;
    period: string;
    position: string;
  }[];
}
