import { getPaperReportResponse } from '@/api/paper/getPaperReport/define';
import ShortAnswerSheet from '@/components/paper/report/ShortAnswerSheet';
import AnswerStatics from '@/components/paper/report/answerStatics';
import { AnimatingNumbers, CircleProgress, Skeleton, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

interface PaperReportPaneProps {
  report?: getPaperReportResponse['result'];
  loading?: boolean;
}

const PaperReortPane: React.FC<PaperReportPaneProps> = ({ report, loading }) => {
  return (
    <>
      {loading ? (
        <Skeleton avatar rows={10} />
      ) : (
        <>
          <View className={styles.container}>
            <View className={styles.topIntro}>
              <View className={styles.info}>
                <Space className={styles.space}>
                  <View>
                    <View className={styles.title}>试卷名称</View>
                    <View className={styles.name}>{report?.paperName}</View>
                    <View className={styles.name}>
                      得分：{report?.userGetScore} / {report?.totalScore}
                    </View>
                  </View>
                  <View className={styles.time}>
                    {`${Math.floor(report?.spendTime! / 3600)
                      .toString()
                      .padStart(2, '0')}:${Math.floor((report?.spendTime! % 3600) / 60)
                      .toString()
                      .padStart(2, '0')}:${(report?.spendTime! % 60).toString().padStart(2, '0')}`}
                  </View>
                </Space>
              </View>
              <View className={styles.progressContainer}>
                <CircleProgress
                  percent={report?.accRate! * 100 || 0}
                  radius={80}
                  color={'#1990fe'}
                  className={styles.progress}
                >
                  <div className={styles.number}>
                    <AnimatingNumbers.CountUp value={(report?.accRate! * 100 || 0).toFixed(0)} />%
                  </div>
                  <div>正确率</div>
                </CircleProgress>
              </View>
            </View>
            <View className={styles.answerStatics}>
              <AnswerStatics
                total={report?.userAnswerSheet.length || 0}
                unAnswered={
                  report?.userAnswerSheet.filter((item) => item.isCorrect === -1).length || 0
                }
                correct={report?.userAnswerSheet.filter((item) => item.isCorrect === 1).length || 0}
                wrong={report?.userAnswerSheet.filter((item) => item.isCorrect === 0).length || 0}
              />
            </View>
            <View className={styles.answerStatics}>
              <ShortAnswerSheet problemList={report?.userAnswerSheet || []} />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default PaperReortPane;
