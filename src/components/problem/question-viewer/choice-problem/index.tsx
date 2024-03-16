import { AnswerSheetItemType } from '@/pages/paper';
import { Checkbox, Radio, Space } from '@nutui/nutui-react-taro';
import { Text, View } from '@tarojs/components';
import React, { useMemo, useState } from 'react';
import { choiceProblem } from '../define';
import styles from './index.module.scss';
//import QuestionAnswer from './QuestionAnswer';
interface ChoiceProblemViewerProps {
  question: choiceProblem;
  className?: string;
  changeAnswer: boolean;
  answerSheetRef?: React.MutableRefObject<AnswerSheetItemType[]> | null;
}

const ChoiceProblemViewer: React.FC<ChoiceProblemViewerProps> = ({
  question,
  className,
  changeAnswer,
  answerSheetRef
}) => {
  const [value, setValue] = useState();
  const options = useMemo(() => {
    return question?.option
      ?.map((item, index) => {
        const val = String.fromCharCode('A'.charCodeAt(0) + index);
        const label = item?.choice || '';
        return {
          label: item ? (
            <>
              <Text style={{ fontSize: '16px' }}>
                {val}
                {'. '}
              </Text>
              <Text style={{ fontSize: '16px' }}>{label}</Text>
            </>
          ) : undefined,
          value: item?.id?.toString()
        };
      })
      ?.map((option) =>
        question.type === 'singleChoice' ? (
          <Radio
            className={`${styles.blockOption} ${styles.option}`}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </Radio>
        ) : (
          <Checkbox
            className={`${styles.blockOption} ${styles.option}`}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </Checkbox>
        )
      );
  }, [question]);
  return (
    <View className={`${className} ${styles.container}`}>
      <View className={styles.title}>{question.problemStatement}</View>
      {question.type === 'singleChoice' ? (
        <Radio.Group
          className={styles.options}
          disabled={!changeAnswer}
          defaultValue={value || question.answer?.[0]}
          onChange={(val) => {
            if (answerSheetRef) {
              const sameIndex = answerSheetRef?.current.findIndex(
                (item) => item.problemId === question._id
              );
              if (sameIndex !== -1) {
                answerSheetRef.current[sameIndex].answer = [val];
                return;
              }
              answerSheetRef.current.push({
                problemId: question._id,
                answer: [val],
                problemType: 'singleChoice'
              });
            }
          }}
        >
          <Space className={styles.options} direction="vertical">
            {options}
          </Space>
        </Radio.Group>
      ) : (
        <Checkbox.Group
          className={styles.options}
          disabled={!changeAnswer}
          defaultValue={value || question.answer}
          onChange={(val) => {
            if (answerSheetRef) {
              const sameIndex = answerSheetRef?.current.findIndex(
                (item) => item.problemId === question._id
              );
              if (sameIndex !== -1) {
                answerSheetRef.current[sameIndex].answer = [val];
                return;
              }
              answerSheetRef.current.push({
                problemId: question._id,
                answer: val,
                problemType: 'multipleChoice'
              });
            }
          }}
        >
          <Space className={styles.options} direction="vertical">
            {options}
          </Space>
        </Checkbox.Group>
      )}
    </View>
  );
};

export default ChoiceProblemViewer;
