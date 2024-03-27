import { usePaperReport } from '@/api/paper/getPaperReport';
import PaperReortPane from '@/components/paper/report';
import WrongProblemPane from '@/components/paper/report/WrongProblemPane';
import { Button } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import React, { useState } from 'react';
import styles from './index.module.scss';

const PaperReortPage: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<'normal' | 'all' | 'onlyWrong'>('normal');
  const { fragmentId, courseId, paperId, reportId } = router.params;
  const { data: report, loading } = usePaperReport({ reportId: reportId || '' });

  return (
    <>
      <View className={styles.container}>
        {mode === 'normal' && <PaperReortPane report={report} />}
        {(mode === 'onlyWrong' || mode === 'all') && report && (
          <WrongProblemPane
            paperId={paperId || ''}
            userAnswerSheet={report?.userAnswerSheet}
            mode={mode}
          />
        )}
      </View>
      <View className={styles.bottomBtnContainer}>
        <Button
          className={`${styles.common} ${styles.all}`}
          onClick={() => {
            if (mode !== 'all') {
              setMode('all');
              return;
            } else if (mode === 'all') {
              setMode('normal');
            }
          }}
        >
          {mode === 'all' ? '返回报告' : '全部解析'}
        </Button>
        <Button
          className={`${styles.common} ${styles.onlyWrong}`}
          onClick={() => {
            if (mode !== 'onlyWrong') {
              setMode('onlyWrong');
              return;
            } else if (mode === 'onlyWrong') {
              setMode('normal');
            }
          }}
        >
          {mode === 'onlyWrong' ? '返回报告' : '错题解析'}
        </Button>
      </View>
    </>
  );
};

export default PaperReortPage;
