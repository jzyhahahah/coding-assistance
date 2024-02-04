export interface courseType {
  courseId: string;
  courseName: string;
  progress: number;
  tags: string[];
}

export interface getAllMyCourseRespones {
  errMsg: string;
  list: courseType[];
}
