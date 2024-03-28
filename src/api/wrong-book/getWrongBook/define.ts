import { Question } from "@/components/problem/question-viewer/define";

export interface GetWrongBookRespones {
  requestID: string;
  result: Question[];
}
