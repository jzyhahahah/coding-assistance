import { useGetPaper } from '@/api/paper/getPaper';
import Timer, { TimerHandle } from '@/components/common/Timer';
import { More } from '@nutui/icons-react-taro';
import { ActionSheet, Button, Progress, Swiper } from '@nutui/nutui-react-taro';
import { ItemType } from '@nutui/nutui-react-taro/dist/types/packages/actionsheet/actionsheet.taro';
import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { useRef, useState } from 'react';
import styles from './index.module.scss';

const PaperPage = () => {
  const router = useRouter();
  const timerRef = useRef<TimerHandle>(null);
  const swiperRef = useRef<any>(null);
  const { fragmentId, courseId, paperId, fragmentTitle } = router.params;
  console.log(fragmentId, courseId, paperId, fragmentTitle);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  const [val1, setVal1] = useState('');
  const [isVisible1, setIsVisible1] = useState(false);
  const { data: paper } = useGetPaper({ paperId: paperId!, mode: 'noAnswer' });
  const optionsOne: ItemType<string>[] = [
    {
      name: '收藏题目'
    }
  ];
  const chooseItem = (item: any) => {
    setVal1(item.name);
    setIsVisible1(false);
  };
  return (
    <>
      <View className={styles.container}>
        <View className={styles.head}>
          <View className={styles.time}>
            <Timer ref={timerRef} />
          </View>
          <View className={styles.title}>{'期末试卷'}</View>
          <View className={styles.icon}>
            <More size={15} onClick={() => setIsVisible1(true)} />
          </View>
        </View>
        <View className={styles.progressContainer}>
          <Progress percent={currentProblemIndex * 10} className={styles.progress} animated />
          <span className={styles.number}>
            <span style={{ color: '#1990fe' }}>{currentProblemIndex}</span>
            /10
          </span>
        </View>
        <View className={styles.problemContainer}>
          <Swiper defaultValue={0} style={{ width: '100%', height: '100%' }} ref={swiperRef}>
            {Array.from({ length: 10 })
              .fill(0)
              .map((item, index) => {
                return (
                  <Swiper.Item key={index}>
                    <div>{index}</div>
                  </Swiper.Item>
                );
              })}
          </Swiper>
        </View>
        <View className={styles.footBtn}>
          <Button
            shape="square"
            className={`${styles.common} ${styles.prev}`}
            onClick={() => {
              if (currentProblemIndex > 0) {
                setCurrentProblemIndex(currentProblemIndex - 1);
              }
              swiperRef.current.prev();
            }}
          >
            上一题
          </Button>
          <Button
            shape="square"
            className={`${styles.common} ${styles.next}`}
            onClick={() => {
              if (currentProblemIndex < 10) {
                setCurrentProblemIndex(currentProblemIndex + 1);
              }
              swiperRef.current.next();
            }}
          >
            下一题
          </Button>
        </View>
      </View>
      <ActionSheet
        visible={isVisible1}
        options={optionsOne}
        onSelect={(item) => {
          chooseItem(item);
        }}
        title="操作"
        cancelText="取消"
        onCancel={() => setIsVisible1(false)}
      />
    </>
  );
};

export default PaperPage;
