export interface BaseQuestion {
  _id: string;
  sequence?: number;
  problemStatement: string;
  solution: string;
}

export interface ChoiceOption {
  id: string;
  sequence: number;
  choice: string;
}

export interface choiceProblem extends BaseQuestion {
  type: 'singleChoice' | 'multipleChoice';
  answer: string[];
  options?: ChoiceOption[];
}
export type Question = choiceProblem;
// | TrueOrFalse
// | FillInTheBlank
// | ShortAnswer
// | Combination;
