export interface GetMyGradeListRequest {
  courseName?: string;
}

export interface GetMyGradeListResponse {
  errMsg: string;
  list: {
    courseId: string;
    courseName: string;
    fragmentId: string;
    fragmentTitle: string;
    paperId: string;
    spendTime: number;
    userGetScore: number;
    userId: string;
    _id: string;
    totalScore: number;
    name: string;
  }[];
}
