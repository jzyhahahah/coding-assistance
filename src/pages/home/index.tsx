import { useAuth } from '@/components/hoc/with-auth';
//import { useLang } from '@/components/hoc/with-lang/define';
import background from '@/assets/xueli.png';
import { Image, Progress, Space } from '@nutui/nutui-react-taro';
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
          <View className={styles.leftProgress}>
            <Space direction="vertical">
              <View>{'今日学习'}</View>
              <View className={styles.staticsNumber}>
                <span className={styles.mainNumber}>{20}</span>
                <span className={styles.subffix}>/ 60分钟</span>
              </View>
              <Progress percent={30} background="#fff" color="rgb(46,48,48)" strokeWidth="5" />
            </Space>
          </View>
          <View className={styles.right}>
            <Space direction="vertical">
              <View className={styles.days}>
                <span className={styles.mainNum}>30</span>
                <span>天</span>
              </View>
              <View>{'已连续学习'}</View>
            </Space>
          </View>
        </Space>
      </View>
      <View className={styles.imgContainer}>
        <Image src={background} width="200" height="200" className={styles.img} />
      </View>
    </View>
  );
};

export default Home;
