import { Question } from '@/components/problem/question-viewer/define';

export interface GetProblemRequest {
  problemId?: string;
  category?: string[];
  problemStatement?: string;
  current: number;
  pageSize: number;
}

export interface GetProblemResponse {
  errMsg: string;
  list: Question[];
  total: number;
}
