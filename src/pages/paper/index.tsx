import { View } from '@tarojs/components';
import React, { useRef } from 'react';
import styles from './index.module.scss';
import Taro, { useRouter } from '@tarojs/taro';
import Timer, { TimerHandle } from '@/components/common/Timer';
import { More } from '@nutui/icons-react-taro'

const PaperPage = () => {
  const router = useRouter();
  const timerRef = useRef<TimerHandle>(null);
  const { fragmentId, courseId, paperId, fragmentTitle } = router.params;
  console.log(fragmentId, courseId, paperId, fragmentTitle);
  return (
    <View className={styles.container}>
      <View className={styles.head}>
        <View className={styles.time}>
          <Timer ref={timerRef} />
        </View>
        <View className={styles.title}>{"期末试卷"}</View>
        <More
          size={20}
          onClick={(e) => Taro.showToast({ title: 'icon' })}
        />
      </View>
    </View>
  )
};

export default PaperPage;