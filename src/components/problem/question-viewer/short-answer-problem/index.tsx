import { TextArea } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { Question } from '../define';
import styles from './index.module.scss';

interface ShortAnswerViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
}

const ShortAnswerViewer: React.FC<ShortAnswerViewerProps> = ({
  question,
  changeAnswer,
  className
}) => {
  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question?.problemStatement}</View>
      <View className={styles.blankContainer}>
        <TextArea
          className={styles.input}
          value={question.answer as string}
          disabled={!changeAnswer}
        />
      </View>
    </View>
  );
};

export default ShortAnswerViewer;
