import { useGetWrongProblem } from '@/api/wrong-book/getWrongBook';
import QuestionViewer from '@/components/problem/question-viewer';
import { Button, Progress, Skeleton, Swiper } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useRef, useState } from 'react';
import styles from './index.module.scss';

const WrongBookPage = () => {
  const { data: problems, loading } = useGetWrongProblem();
  const swiperRef = useRef<any>(null);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  return (
    <>
      {!loading ? (
        <View className={styles.container}>
          <View className={styles.progressContainer}>
            <Progress
              percent={currentProblemIndex * (100 / problems!?.length)}
              className={styles.progress}
              animated
            />
            <span className={styles.number}>
              <span style={{ color: '#1990fe' }}>{currentProblemIndex}</span>/{problems!?.length}
            </span>
          </View>
          <View className={styles.problemContainer}>
            {problems && (
              <Swiper
                style={{ width: '100%', height: '100%' }}
                ref={swiperRef}
                onChange={(e) => {
                  setCurrentProblemIndex(e.detail.current + 1);
                }}
              >
                {problems.map((item, index) => {
                  return (
                    <Swiper.Item key={item?._id + item?.createAt} style={{ height: '100%' }}>
                      <View style={{ padding: '20px 15px' }}>
                        <QuestionViewer item={item} changeAnswer={false} />
                        <View style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                          {`题目解析：`}
                          {item.solution || '暂无解析'}
                        </View>
                      </View>
                    </Swiper.Item>
                  );
                })}
              </Swiper>
            )}
          </View>
          <View className={styles.footBtn}>
            <Button
              shape="square"
              className={`${styles.common} ${styles.prev}`}
              onClick={() => {
                swiperRef.current.prev();
                if (currentProblemIndex > 1) {
                  setCurrentProblemIndex(currentProblemIndex - 1);
                }
              }}
            >
              {currentProblemIndex > 1 ? '上一题' : '无'}
            </Button>
            <Button
              shape="square"
              className={`${styles.common} ${styles.next}`}
              onClick={() => {
                swiperRef.current.next();
                if (currentProblemIndex < problems!?.length) {
                  setCurrentProblemIndex(currentProblemIndex + 1);
                }
              }}
            >
              {currentProblemIndex < problems!?.length ? '下一题' : '无'}
            </Button>
          </View>
        </View>
      ) : (
        <Skeleton animated rows={30} />
      )}
    </>
  );
};

export default WrongBookPage;
