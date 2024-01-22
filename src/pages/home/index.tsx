import { useAuth } from '@/components/hoc/with-auth';
//import { useLang } from '@/components/hoc/with-lang/define';
import { Progress, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

const Home = () => {
  //const { lang, toggle, format: t } = useLang();
  const { user } = useAuth();
  return (
    <View className={styles.container}>
      <View className={styles.topUserName}>{user?.nickName}</View>
      <View className={styles.topCodingExp}>{user?.coding}</View>
      <View className={styles.userStatus}>
        <Space>
          <view className={styles.leftProgress}>
            <Space direction="vertical">
              <View>{'今日学习'}</View>
              <view className={styles.staticsNumber}>
                <span className={styles.mainNumber}>{20}</span>
                <span className={styles.subffix}>/ 60分钟</span>
              </view>
              <Progress percent={30} background="#fff" color="rgb(46,48,48)" strokeWidth="5" />
            </Space>
          </view>
        </Space>
      </View>
    </View>
  );
};

export default Home;
