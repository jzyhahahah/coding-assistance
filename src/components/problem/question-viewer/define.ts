export interface BaseQuestion {
  _id: string;
  sequence?: number;
  problemStatement: string;
  option?: ChoiceOption[];
  solution?: string;
  creator?: string;
  createAt?: number;
  mark?: number;
  seq?: number;
}

export interface ChoiceOption {
  id: string;
  sequence: number;
  choice: string;
}

export interface choiceProblem extends BaseQuestion {
  type: 'singleChoice' | 'multipleChoice';
  answer?: string[];
}

export interface TrueOrFalse extends BaseQuestion {
  type: 'TrueOrFalse';
  answer?: boolean;
}

export interface FillInTheBlank extends BaseQuestion {
  type: 'fillInBlank';
  answer?: string[];
  answerNum?: number;
}

export interface ShortAnswer extends BaseQuestion {
  type: 'shortAnswer';
  answer: string;
}

export type Question = choiceProblem | TrueOrFalse | FillInTheBlank | ShortAnswer;
// | TrueOrFalse
// | FillInTheBlank
// | ShortAnswer
// | Combination;
