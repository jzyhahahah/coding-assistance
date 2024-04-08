import { SearchBar } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import ScoreCard from '@/components/score/scoreCard';

const Score = () => {
  return (
    <View className={styles.container}>
      <View className={styles.topSearch}>
        <SearchBar
          shape="round"
          maxLength={20}
          placeholder="请输入课程名称"
          onClear={() => {
            //getSearchedCoures({ courseName: '' });
          }}
          onChange={(value) => {
            //getSearchedCoures({ courseName: value });
          }}
        />
      </View>
      <View className={styles.rerordcontainer}>
        {[1,2,3,4,5,6,7,8,9,1,2,3].map(v => (
          <ScoreCard />
        ))}
      </View>
    </View>
  );
};

export default Score;
