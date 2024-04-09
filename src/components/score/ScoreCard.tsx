import { View } from '@tarojs/components';
import styles from './ScoreCard.module.scss';

interface ScoreCardProp {
  title: string;
  subTitle: string;
  score: number;
  totalScore: number
  spendTime: number;

}

const ScoreCard: React.FC<ScoreCardProp> = ({
  title,
  score, spendTime, subTitle, totalScore
}) => {
  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <View className={styles.left}>
          <View className={styles.title}>{title}</View>
          <View className={styles.description}>{subTitle}</View>
        </View>
        <View className={styles.right}>
          <View className={styles.score}>
            <View className={styles.myScore}>{score}</View>
            <View className={styles.total}>{`/ ${totalScore}`}</View>
          </View>
          <View className={styles.time}>{'用时：'}{`${Math.floor(spendTime! / 3600)
            .toString()
            .padStart(2, '0')}:${Math.floor((spendTime! % 3600) / 60)
              .toString()
              .padStart(2, '0')}:${(spendTime! % 60).toString().padStart(2, '0')}`}</View>
        </View>
      </View>
    </View>
  )
}

export default ScoreCard;