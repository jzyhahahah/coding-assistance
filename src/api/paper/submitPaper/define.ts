export interface submitPaperRequest {
  paperId: string;
  userAnswer: {
    problemId: string;
    answer: any;
  }[];
  spendTime: number;
  courseId: string;
  fragmentId: string;
}

export interface submitPaperResponse {
  errMsg: string;
  _id: string;
}
