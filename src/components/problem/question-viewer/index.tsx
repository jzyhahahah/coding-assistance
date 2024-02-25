import React from 'react';
import ChoiceProblemViewer from './choice-problem';
import { Question } from './define';
import FillInBlankViewer from './fill-in-blank-problem';
import TrueOrFalseProblemViewer from './true-or-false-problem';
import ShortAnswerViewer from './short-answer-problem';

interface QuestionViewerProps {
  item: Question;
  // showAnswer: boolean; //是否能够显示答案
  // showResult: boolean; //是否能够更改结果
  // showSurface: boolean; //是否能够显示题号、分数信息
  // showUserAnswer: boolean; //显示用户答案还是正确答案
  changeAnswer: boolean;
  className?: string;
}
const QuestionViewer: React.FC<QuestionViewerProps> = ({ item, ...props }) => {
  return (
    <>
      {(item.type === 'singleChoice' || item.type === 'multipleChoice') && (
        <ChoiceProblemViewer {...props} question={{ ...item, type: item.type }} />
      )}
      {item.type === 'TrueOrFalse' && (
        <TrueOrFalseProblemViewer {...props} question={{ ...item, type: item.type }} />
      )}
      {item.type === 'fillInBlank' && (
        <FillInBlankViewer {...props} question={{ ...item, type: item.type }} />
      )}
      {item.type === 'shortAnswer' && (
        <ShortAnswerViewer {...props} question={{ ...item, type: item.type }} />
      )}
    </>
  );
};

export default QuestionViewer;
