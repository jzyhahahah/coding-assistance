import { getPaperReportResponse } from '@/api/paper/getPaperReport/define';
import { Grid, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './ShortAnswerSheet.module.scss';

interface ShortAnswerSheetProps {
  problemList: getPaperReportResponse['result']['userAnswerSheet'];
}

const ShortAnswerSheet: React.FC<ShortAnswerSheetProps> = ({ problemList }) => {
  const colorMap = {
    '1': 'rgb(15, 184, 142)',
    '0': 'rgb(255, 88, 60)',
    '-1': 'rgb(240, 240, 240)'
  };
  return (
    <>
      <View className={styles.container}>
        <View className={styles.topContainer}>
          <View className={styles.title}>答题卡</View>
          <View className={styles.content}>
            <Space className={styles.legend}>
              <View className={`${styles.legendItem} ${styles.correct}`}>正确</View>
              <View className={`${styles.legendItem} ${styles.incorrect}`}>错误</View>
              <View className={`${styles.legendItem} ${styles.unAnswered}`}>未作答</View>
            </Space>
            <Grid columns={5} className={styles.grid}>
              {problemList
                .sort((a, b) => a.seq - b.seq)
                .map((item, index) => {
                  return (
                    <Grid.Item>
                      <View
                        className={styles.item}
                        style={{
                          background: colorMap[item.isCorrect],
                          color: item.isCorrect === -1 ? 'rgb(155,155,155)' : '#fff'
                        }}
                      >
                        <View style={{ marginTop: '2.5px' }}>{index + 1}</View>
                      </View>
                    </Grid.Item>
                  );
                })}
            </Grid>
          </View>
        </View>
      </View>
    </>
  );
};

export default ShortAnswerSheet;
