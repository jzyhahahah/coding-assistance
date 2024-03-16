import { AnswerSheetItemType } from '@/pages/paper';
import { TextArea } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { Question } from '../define';
import styles from './index.module.scss';

interface ShortAnswerViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
  answerSheetRef?: React.MutableRefObject<AnswerSheetItemType[]>;
}

const ShortAnswerViewer: React.FC<ShortAnswerViewerProps> = ({
  question,
  changeAnswer,
  className,
  answerSheetRef
}) => {
  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question?.problemStatement}</View>
      <View className={styles.blankContainer}>
        <TextArea
          className={styles.input}
          defaultValue={question.answer as string}
          disabled={!changeAnswer}
          onChange={(val) => {
            if (answerSheetRef) {
              const sameIndex = answerSheetRef?.current.findIndex(
                (item) => item.problemId === question._id
              );
              if (sameIndex !== -1) {
                answerSheetRef.current[sameIndex].answer = val;
                return;
              }
              answerSheetRef.current.push({
                problemId: question._id,
                answer: val,
                problemType: 'shortAnswer'
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default ShortAnswerViewer;
