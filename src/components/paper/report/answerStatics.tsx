import { Grid } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './answerStatics.module.scss';

interface AnswerStaticsProps {
  total: number;
  correct: number;
  wrong: number;
  unAnswered: number;
}

const AnswerStatics: React.FC<AnswerStaticsProps> = ({ total, correct, wrong, unAnswered }) => {
  return (
    <View className={styles.container}>
      <h1>作答情况</h1>
      <View className={styles.content}>
        <Grid className={styles.grid}>
          <Grid.Item text="共计">
            <span className={`${styles.common}`}>{total}</span>
          </Grid.Item>
          <Grid.Item text="答对">
            <span className={`${styles.common} ${styles.correct}`}>{correct}</span>
          </Grid.Item>
          <Grid.Item text="答错">
            <span className={`${styles.common} ${styles.wrong}`}>{wrong}</span>
          </Grid.Item>
          <Grid.Item text="未作答">
            <span className={`${styles.common}`}>{unAnswered}</span>
          </Grid.Item>
        </Grid>
      </View>
    </View>
  );
};

export default AnswerStatics;
