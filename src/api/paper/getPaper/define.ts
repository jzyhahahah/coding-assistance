export interface getPaperRequest {
  paperId: string;
  mode: 'withAnswer' | 'noAnswer';
}

export interface ChoiceOption {
  id: string;
  sequence: number;
  choice: string;
}


export type QuestionItem = {
  _id: string;
  answer: string | string[] | boolean;
  createAt?: number;
  option?: ChoiceOption[];
  problemStatement: string;
  solution: string;
  type: 'singleChoice' | 'TrueOrFalse' | 'multipleChoice' | 'fillInBlank' | 'shortAnswer';
};

export interface GetPaperResponse {
  errMsg: string;
  list: {
    name: string;
    problemList: { problem: QuestionItem; mark: number; seq: number }[];
    totalScore: number;
    createAt: number;
  }[];
}
