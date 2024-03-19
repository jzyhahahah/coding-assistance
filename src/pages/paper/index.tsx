import { useGetPaper } from '@/api/paper/getPaper';
import Timer, { TimerHandle } from '@/components/common/Timer';
import QuestionViewer from '@/components/problem/question-viewer';
import { Question } from '@/components/problem/question-viewer/define';
import { More } from '@nutui/icons-react-taro';
import { ActionSheet, Button, Progress, Skeleton, Swiper } from '@nutui/nutui-react-taro';
import { ItemType } from '@nutui/nutui-react-taro/dist/types/packages/actionsheet/actionsheet.taro';
import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { useRef, useState } from 'react';
import styles from './index.module.scss';

export interface AnswerSheetItemType {
  problemId: string;
  answer: any;
  problemType?: 'singleChoice' | 'multipleChoice' | 'TrueOrFalse' | 'fillInBlank' | 'shortAnswer';
}

const PaperPage = () => {
  const router = useRouter();
  const timerRef = useRef<TimerHandle>(null);
  const swiperRef = useRef<any>(null);
  const answerSheetRef = useRef<AnswerSheetItemType[]>([]);
  const { fragmentId, courseId, paperId, fragmentTitle } = router.params;
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
      {paper ? (
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
            <Progress
              percent={currentProblemIndex * (100 / paper[0].problemList.length)}
              className={styles.progress}
              animated
            />
            <span className={styles.number}>
              <span style={{ color: '#1990fe' }}>{currentProblemIndex}</span>/
              {paper[0].problemList.length}
            </span>
          </View>
          <View className={styles.problemContainer}>
            {paper && (
              <Swiper style={{ width: '100%', height: '100%' }} ref={swiperRef}>
                {paper?.[0]?.problemList
                  ?.sort((a, b) => a.seq - b.seq)
                  .map((item, index) => {
                    return (
                      <Swiper.Item
                        key={item?.problem?._id + item?.problem?.createAt}
                        style={{ height: '100%' }}
                      >
                        <View style={{ padding: '20px 15px' }}>
                          <QuestionViewer
                            item={{ ...item.problem, mark: item?.mark, seq: item?.seq } as Question}
                            changeAnswer={true}
                            answerSheetRef={answerSheetRef}
                          />
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
                if (currentProblemIndex === paper[0].problemList.length) {
                  const userAnswer = answerSheetRef.current.map((item) => {
                    if (item.problemType === 'fillInBlank') {
                      const keys = Object.keys(item.answer).map(Number);
                      const result: any = [];
                      for (let i = 0; i <= Math.max(...keys); i++) {
                        result[i] = item.answer[i] || '';
                      }
                      item.answer = result;
                      return {
                        problemId: item.problemId,
                        answer: item.answer
                      };
                    } else if (
                      item.problemType === 'shortAnswer' ||
                      item.problemType === 'singleChoice' ||
                      item.problemType === 'TrueOrFalse'
                    ) {
                      return {
                        problemId: item.problemId,
                        answer: item.answer
                      };
                    } else {
                      return {
                        problemId: item.problemId,
                        answer: item.answer[0]
                      };
                    }
                  });
                  console.log(userAnswer);
                }
                if (currentProblemIndex < paper[0].problemList.length) {
                  setCurrentProblemIndex(currentProblemIndex + 1);
                }
              }}
            >
              {currentProblemIndex < paper[0].problemList.length ? '下一题' : '交卷'}
            </Button>
          </View>
        </View>
      ) : (
        <Skeleton animated rows={30} />
      )}
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
