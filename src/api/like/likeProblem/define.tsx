import { Question } from '@/components/problem/question-viewer/define';

export interface GetLikeProblemListResponse {
  _id: string;
  likeProblems: string[];
}

export interface AddLikeProblemRequest {
  problemId: string;
}

export interface AddLikeProblemResponse {
  errMsg: string;
}

export interface RemoveLikeProblemRequest {
  problemId: string;
}

export interface RemoveLikeProblemResponse {
  errMsg: string;
}

export interface GetLikeProblemListDetailRequest {
  type?: string;
  problemStatement?: string;
}

export interface GetLikeProblemListDetailResponse {
  _id: string;
  likeProblems: Question[];
}
