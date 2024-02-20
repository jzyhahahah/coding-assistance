export interface updateCourseProgressRequest {
  courseId: string;
  fragmentId: string;
}

export interface updateCourseProgressResponse {
  errMsg: string;
  stats: {
    updated: number;
  };
}
