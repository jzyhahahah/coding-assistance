import { View } from '@tarojs/components';
import styles from './ScoreCard.module.scss';

const ScoreCard = () => {
  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <View className={styles.left}>
          <View className={styles.title}>{'C++程序设计'}</View>
          <View className={styles.description}>{'期末测试'}</View>
        </View>
        <View className={styles.right}>
          <View className={styles.score}>{'90 / 100'}</View>
          <View className={styles.time}>{'用时：'}{'00:30:25'}</View>
        </View>
      </View>
    </View>
  );
};

export default ScoreCard;
