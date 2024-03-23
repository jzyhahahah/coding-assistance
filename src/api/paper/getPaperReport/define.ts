export interface getPaperReportRequest {
  reportId: string;
}

export interface getPaperReportResponse {
  errMsg: string;
  result: {
    _id: string;
    paperName: string;
    accRate: number;
    courseId: string;
    fragmentId: string;
    paperId: string;
    spendTime: number;
    totalScore: number;
    userGetScore: number;
    userId: string;
    userAnswerSheet: {
      isCorrect: number;
      problemId: string;
      seq: number;
      userAnswer: any;
      userScore: number;
    }[];
  };
}
