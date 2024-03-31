import { useGetPaper } from '@/api/paper/getPaper';
import { useSubmitPaper } from '@/api/paper/submitPaper';
import Timer, { TimerHandle } from '@/components/common/Timer';
import QuestionViewer from '@/components/problem/question-viewer';
import { Question } from '@/components/problem/question-viewer/define';
import { More } from '@nutui/icons-react-taro';
import {
  ActionSheet,
  Button,
  Dialog,
  Loading,
  Overlay,
  Progress,
  Skeleton,
  Swiper
} from '@nutui/nutui-react-taro';
import { ItemType } from '@nutui/nutui-react-taro/dist/types/packages/actionsheet/actionsheet.taro';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
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
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const answerSheetRef = useRef<AnswerSheetItemType[]>([]);
  const { fragmentId, courseId, paperId, fragmentTitle } = router.params;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  const [val1, setVal1] = useState('');
  const [isVisible1, setIsVisible1] = useState(false);
  const { data: paper } = useGetPaper({ paperId: paperId!, mode: 'noAnswer' });
  const { runAsync: submitPaper, loading: submitLoading } = useSubmitPaper();
  const optionsOne: ItemType<string>[] = [
    {
      name: '收藏题目'
    }
  ];
  const chooseItem = (item: any) => {
    setVal1(item.name);
    setIsVisible1(false);
  };

  const getUserAnswer = () => {
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
    return userAnswer;
  };

  return (
    <>
      {paper ? (
        <View className={styles.container}>
          <View className={styles.head}>
            <View className={styles.time}>
              <Timer ref={timerRef} />
            </View>
            <View className={styles.title}>{fragmentTitle}</View>
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
              onClick={async () => {
                swiperRef.current.next();
                if (currentProblemIndex === paper[0].problemList.length) {
                  const userAnswer = getUserAnswer();
                  const time = timerRef.current?.getTime();
                  if (
                    userAnswer.length !== paper[0].problemList.length ||
                    userAnswer.some(
                      (item) =>
                        item.answer === undefined ||
                        item.answer === '' ||
                        item.answer === null ||
                        (Array.isArray(item.answer) && item.answer.length === 0) ||
                        (Array.isArray(item.answer) && item.answer.every((i) => i === ''))
                    )
                  ) {
                    setAnswerModalVisible(true);
                    return;
                  }
                  const res = await submitPaper({
                    paperId: paperId!,
                    userAnswer,
                    spendTime: time?.hours! * 60 * 60 + time?.minutes! * 60 + time?.seconds!,
                    courseId: courseId!,
                    fragmentId: fragmentId!
                  });
                  Taro.showToast({
                    title: '交卷成功',
                    icon: 'success'
                  });
                  Taro.redirectTo({
                    url: `/pages/paper-report/index?paperId=${paperId}&courseId=${courseId}&fragmentId=${fragmentId}&fragmentTitle=${fragmentTitle}&reportId=${res._id}`
                  });
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
      <Dialog
        title="提示"
        visible={answerModalVisible}
        footerDirection="vertical"
        confirmText="确定"
        cancelText="取消"
        onConfirm={async () => {
          const userAnswer = getUserAnswer();
          const time = timerRef.current?.getTime();
          setAnswerModalVisible(false);
          const res = await submitPaper({
            paperId: paperId!,
            userAnswer,
            spendTime: time?.hours! * 60 * 60 + time?.minutes! * 60 + time?.seconds!,
            courseId: courseId!,
            fragmentId: fragmentId!
          });
          Taro.redirectTo({
            url: `/pages/paper-report/index?paperId=${paperId}&courseId=${courseId}&fragmentId=${fragmentId}&fragmentTitle=${fragmentTitle}&reportId=${res._id}`
          });
          return () => { };
        }}
        onCancel={() => {
          setAnswerModalVisible(false);
        }}
      >
        有题目未作答，确定交卷吗？
      </Dialog>
      <Overlay visible={submitLoading}>
        <div
          className="wrapper"
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loading direction="vertical">提交答案中</Loading>
        </div>
      </Overlay>
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
