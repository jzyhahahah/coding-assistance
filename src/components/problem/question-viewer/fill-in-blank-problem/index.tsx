import { AnswerSheetItemType } from '@/pages/paper';
import { Input } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useState } from 'react';
import { Question } from '../define';
import styles from './index.module.scss';

interface FillInBlankViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
  answerSheetRef?: React.MutableRefObject<AnswerSheetItemType[]> | null;
}

const FillInBlankViewer: React.FC<FillInBlankViewerProps> = ({
  question,
  changeAnswer,
  className,
  answerSheetRef
}) => {
  const [value, setValue] = useState({});
  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question?.problemStatement}</View>
      <View className={styles.blankContainer}>
        {question.type === 'fillInBlank' &&
          [...Array(question?.answerNum)]?.map((item, index) => {
            return (
              <View className={styles.blank} key={index}>
                <span className={styles.blankText}>{`${index + 1}、`}</span>
                <Input
                  type="text"
                  className={styles.input}
                  defaultValue={item || ''}
                  disabled={!changeAnswer}
                  onChange={(val) => {
                    if (answerSheetRef) {
                      const sameIndex = answerSheetRef?.current.findIndex(
                        (item) => item.problemId === question._id
                      );
                      if (sameIndex !== -1) {
                        const prevAnswer = answerSheetRef.current[sameIndex].answer;
                        answerSheetRef.current[sameIndex].answer = {
                          ...prevAnswer,
                          [index]: val
                        };
                        return;
                      } else {
                        answerSheetRef.current.push({
                          problemId: question._id,
                          answer: { [index]: val },
                          problemType: 'fillInBlank'
                        });
                      }
                      setValue({ ...value, [index]: val });
                    }
                  }}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default FillInBlankViewer;
