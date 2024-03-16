import { AnswerSheetItemType } from '@/pages/paper';
import { Radio } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import React, { useMemo, useState } from 'react';
import { Question } from '../define';
import styles from './index.module.scss';

interface QuestionViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
  answerSheetRef?: React.MutableRefObject<AnswerSheetItemType[]>;
}

const TrueOrFalseProblemViewer: React.FC<QuestionViewerProps> = ({
  question,
  changeAnswer,
  className,
  answerSheetRef
}) => {
  const [value, setValue] = useState<boolean>();
  const options = useMemo(
    () =>
      [
        { label: 'T', value: 'T' },
        { label: 'F', value: 'F' }
      ].map((option) => (
        <Radio className={styles.option} key={option.label} value={option.value}>
          <span className={styles.label}>{option.label}</span>
        </Radio>
      )),
    [question]
  );

  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question.problemStatement}</View>
      <Radio.Group
        defaultValue={
          value || question.answer
            ? 'T'
            : value === false || question.answer === false
              ? 'F'
              : undefined
        }
        className={styles.Radio}
        disabled={!changeAnswer}
        onChange={(val) => {
          if (answerSheetRef) {
            const sameIndex = answerSheetRef.current.findIndex(
              (item) => item.problemId === question._id
            );
            if (sameIndex !== -1) {
              answerSheetRef.current[sameIndex].answer = val === 'T' ? true : false;
              return;
            }
            answerSheetRef.current.push({
              problemId: question._id,
              answer: val === 'T' ? true : false,
              problemType: 'TrueOrFalse'
            });
          }
        }}
      >
        {options}
      </Radio.Group>
    </View>
  );
};

export default TrueOrFalseProblemViewer;
