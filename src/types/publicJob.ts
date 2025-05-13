// 공공 데이터 포탈 API 응답 타입
export type PublicJobPostingResponse = {
  recrutPblntSn: number | null;
  pblntInstCd: string | null;
  pbadmsStdInstCd: string | null;
  instNm: string | null;
  ncsCdLst: string | null;
  ncsCdNmLst: string | null;
  hireTypeLst: string | null;
  hireTypeNmLst: string | null;
  workRgnLst: string | null;
  workRgnNmLst: string | null;
  recrutSe: string | null;
  recrutSeNm: string | null;
  prefCondCn: string | null;
  recrutNope: number | null;
  pbancBgngYmd: string;
  pbancEndYmd: string;
  recrutPbancTtl: string | null;
  srcUrl: string | null;
  replmprYn: string | null;
  aplyQlfcCn: string | null;
  disqlfcRsn: string | null;
  scrnprcdrMthdExpln: string | null;
  prefCn: string | null;
  acbgCondLst: string | null;
  acbgCondNmLst: string | null;
  nonatchRsn: string | null;
  ongoingYn: string | null;
  decimalDay: number | null;
  files: string[] | null;
  steps: string[] | null;
};

// 데이터 타입 정제, id 추가
export type PublicJobPosting = {
  id: number;
  title: string | null; // recrutPbancTtl
  company: string | null; // instNm
  job: string | null; // ncsCdNmLst
  position: string | null; // recrutSeNm
  employmentType: string | null; // hireTypeNmLst
  location: string | null; // workRgnNmLst
  qualification: string | null; // aplyQlfcCn
  disqualification: string | null; // disqlfcRsn
  education: string | null; // acbgCondNmLst
  preference: string | null; // prefCondCn
  preferenceDetail: string | null; // prefCn
  hiringProcess: string | null; // scrnprcdrMthdExpln
  postedAt: string; // pbancBgngYmd
  deadline: string; // pbancEndYmd
  url: string | null; // srcUrl
};

export type PublicJobsResponse = {
  total: number;
  offset: number;
  limit: number;
  data: PublicJobPosting[];
};
