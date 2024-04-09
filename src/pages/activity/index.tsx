import { Button, SearchBar, Skeleton } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ScoreCard from '@/components/score/ScoreCard';
import { useGetMyGradeList } from '@/api/score/getMyGradeList';
import Taro from '@tarojs/taro';
import { useState } from 'react';

const Score = () => {
  const { data: list, runAsync: search, loading } = useGetMyGradeList();
  const [keyword, setKeyword] = useState<string>();
  return (
    <View className={styles.container}>
      <View className={styles.topSearch}>
        <SearchBar
          shape="round"
          value={keyword}
          maxLength={20}
          placeholder="请输入课程名称"
          onClear={() => {
            setKeyword(undefined);
            //getSearchedCoures({ courseName: '' });
          }}
          onChange={(value) => {
            setKeyword(value)
          }}
          right={
            <Button
              className={styles.btn}
              type="primary"
              onClick={async () => {
                await search({
                  courseName: keyword
                })
              }}
            >
              {"搜索"}
            </Button>
          }
        />
      </View>
      {loading ? <Skeleton rows={10} title animated /> :
        <View className={styles.rerordcontainer}>
          {list?.list.map(item => {
            return (
              <View onClick={() => {
                Taro.navigateTo({
                  url: `/pages/paper-report/index?paperId=${item.paperId}&courseId=${item.courseId}&fragmentId=${item.fragmentId}&fragmentTitle=${item.fragmentTitle}&reportId=${item._id}`
                });
              }}>
                <ScoreCard
                  key={item._id}
                  title={item.courseName}
                  subTitle={item.fragmentTitle}
                  spendTime={item.spendTime}
                  totalScore={item.totalScore}
                  score={item.userGetScore}
                />
              </View>
            )
          })}
        </View>
      }
    </View>
  );
};

export default Score;
