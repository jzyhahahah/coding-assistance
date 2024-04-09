import { useAddLikeProblem, useRemoveLikeProblem } from '@/api/like/likeProblem';
import { useGetPaper } from '@/api/paper/getPaper';
import { getPaperReportResponse } from '@/api/paper/getPaperReport/define';
import QuestionViewer from '@/components/problem/question-viewer';
import { Question } from '@/components/problem/question-viewer/define';
import { Button, Empty, Swiper } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './WrongProblemPane.module.scss';

interface WrongProblemPaneProps {
  paperId: string;
  userAnswerSheet?: getPaperReportResponse['result']['userAnswerSheet'];
  mode: 'all' | 'onlyWrong';
  likeList?: string[];
  refreshLikeList?: () => void;
}

const WrongProblemPane: React.FC<WrongProblemPaneProps> = ({
  paperId,
  userAnswerSheet,
  mode,
  likeList,
  refreshLikeList
}) => {
  const { data: paper } = useGetPaper({ paperId: paperId!, mode: 'withAnswer' });
  const swiperRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);

  const { runAsync: removeLike } = useRemoveLikeProblem();
  const { runAsync: addLike } = useAddLikeProblem();

  const sortedPaper = useMemo(() => {
    const showPaper =
      mode === 'all'
        ? paper?.[0]?.problemList
        : paper?.[0]?.problemList.filter(
            (problem) =>
              userAnswerSheet?.find((item) => item.problemId === problem.problem._id)?.isCorrect !==
              1
          );
    return showPaper?.sort((a, b) => a.seq - b.seq);
  }, [paper]);
  /*   const [currentProblemId, setCurrentProblemId] = useState<string>(
    sortedPaper?.[0].problem._id || ''
  );

  useEffect(() => {
    const problemId = sortedPaper?.[current].problem._id;
    setCurrentProblemId(problemId || '');
  }, [current]);

  useEffect(()=>{
    console.log('currentProblemId', currentProblemId);
  },[currentProblemId]) */

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
              {sortedPaper?.length !== 0 ? (
                sortedPaper
                  ?.sort((a, b) => a.seq - b.seq)
                  .map((item, index) => {
                    const inLikeList = likeList?.includes(item.problem._id);
                    return (
                      <Swiper.Item
                        key={item?.problem?._id + item?.problem?.createAt}
                        style={{ height: '100%' }}
                      >
                        <View style={{ textAlign: 'right' }}>
                          <Button
                            type={inLikeList ? 'danger' : 'primary'}
                            style={{ margin: '10px' }}
                            onClick={async () => {
                              if (inLikeList) {
                                await removeLike({ problemId: item.problem._id });
                              } else {
                                await addLike({ problemId: item.problem._id });
                              }
                              refreshLikeList?.();
                            }}
                          >
                            {inLikeList ? '取消收藏' : '收藏题目'}
                          </Button>
                        </View>
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
