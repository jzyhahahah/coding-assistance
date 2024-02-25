import { Input } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { Question } from '../define';
import styles from './index.module.scss';

interface FillInBlankViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
}

const FillInBlankViewer: React.FC<FillInBlankViewerProps> = ({
  question,
  changeAnswer,
  className
}) => {
  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question?.problemStatement}</View>
      <View className={styles.blankContainer}>
        {Array.isArray(question.answer) &&
          question?.answer?.map((item, index) => {
            return (
              <View className={styles.blank} key={index}>
                <span className={styles.blankText}>{`${index + 1}、`}</span>
                <Input
                  type="text"
                  className={styles.input}
                  value={item || ''}
                  disabled={!changeAnswer}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default FillInBlankViewer;
