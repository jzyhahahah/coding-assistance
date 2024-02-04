export interface courseType {
  courseId: string;
  courseName: string;
  tags: string[];
}

export interface getAllCourseRequest {
  courseName?: string;
}

export interface getAllCourseRespones {
  errMsg: string;
  list: courseType[];
}
