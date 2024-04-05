export interface CourseFragment {
  fragmentId: string;
  fragmentTitle: string;
  courseId: string;
  type: 'video' | 'paper';
  paperId?: string;
  videoUrl?: string;
  seq: number;
}

export interface CourseFragmentRequest {
  courseId: string;
}

export interface CourseFragmentResponse {
  errMsg: string;
  list: CourseFragment[];
}
