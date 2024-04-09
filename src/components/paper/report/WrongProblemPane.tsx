import { useGetPaper } from '@/api/paper/getPaper';
import { getPaperReportResponse } from '@/api/paper/getPaperReport/define';
import QuestionViewer from '@/components/problem/question-viewer';
import { Question } from '@/components/problem/question-viewer/define';
import { Empty, Swiper, Button } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useEffect, useRef, useState } from 'react';
import styles from './WrongProblemPane.module.scss';

interface WrongProblemPaneProps {
  paperId: string;
  userAnswerSheet?: getPaperReportResponse['result']['userAnswerSheet'];
  mode: 'all' | 'onlyWrong';
}

const WrongProblemPane: React.FC<WrongProblemPaneProps> = ({ paperId, userAnswerSheet, mode }) => {
  const { data: paper } = useGetPaper({ paperId: paperId!, mode: 'withAnswer' });
  const swiperRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const showPaper =
    mode === 'all'
      ? paper?.[0]?.problemList
      : paper?.[0]?.problemList.filter(
        (problem) =>
          userAnswerSheet?.find((item) => item.problemId === problem.problem._id)?.isCorrect !== 1
      );
  useEffect(() => {
    if (swiperRef.current) swiperRef.current.to(0);
  }, [mode]);

  const getCurrentProblem = (pid: string) => {
    return userAnswerSheet?.find((v) => v.problemId === pid);
  };

  const renderAnswer = (answer: string | boolean | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join('、');
    }
    if (typeof answer === 'boolean') {
      return answer ? '正确' : '错误';
    }
    return answer;
  };

  return (
    <>
      <View className={styles.container}>
        <View className={styles.header}>
          <View className={styles.title}>
            <span className={styles.label}>{'试卷名称：'}</span>
            <span>{paper?.[0]?.name}</span>
          </View>
          <Button type="primary">{"收藏题目"}</Button>
        </View>
        <View className={styles.seq}>
          <span className={styles.label}>
            {'第'}
            {current + 1}
            {'题'}
          </span>
        </View>
        <View className={styles.problemViewer}>
          {paper && (
            <Swiper
              style={{ width: '100%', height: '100%' }}
              ref={swiperRef}
              className={styles.problemSwiper}
              defaultValue={0}
              onChange={(e) => {
                setCurrent(e.detail.current);
              }}
            >
              {showPaper?.length !== 0 ? (
                showPaper
                  ?.sort((a, b) => a.seq - b.seq)
                  .map((item, index) => {
                    return (
                      <Swiper.Item
                        key={item?.problem?._id + item?.problem?.createAt}
                        style={{ height: '100%' }}
                      >
                        <QuestionViewer
                          item={{ ...item.problem, mark: item?.mark, seq: item?.seq } as Question}
                          changeAnswer={false}
                          className={styles.viewer}
                        />
                        <View className={styles.answer}>
                          <View className={styles.correct}>
                            正确答案：{renderAnswer(item.problem.answer)}
                          </View>
                          <View
                            className={styles.myAnswer}
                            style={{
                              color:
                                getCurrentProblem(item.problem._id)?.isCorrect !== 1
                                  ? 'rgb(255, 88, 60)'
                                  : 'rgb(15, 184, 142)'
                            }}
                          >
                            你的答案：
                            {renderAnswer(getCurrentProblem(item.problem._id)?.userAnswer) ||
                              '未作答'}
                          </View>
                          <View className={styles.solution}>
                            <span style={{ color: 'rgb(168, 168, 168)', whiteSpace: 'nowrap' }}>
                              题目解析：
                            </span>
                            {item.problem.solution || '暂无解析'}
                          </View>
                        </View>
                      </Swiper.Item>
                    );
                  })
              ) : (
                <Empty description="恭喜你，全部正确！" imageSize={80} />
              )}
            </Swiper>
          )}
        </View>
      </View>
    </>
  );
};

export default WrongProblemPane;
