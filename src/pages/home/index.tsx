import { useAuth } from '@/components/hoc/with-auth';
import { useLang } from '@/components/hoc/with-lang/define';
import { Text, View } from '@tarojs/components';
import styles from './index.module.scss';

const Home = () => {
  const { lang, toggle, format: t } = useLang();
  const { user } = useAuth();

  const date = new Date('2023-01-01');
  return (
    <View className={styles.container}>
      <Text className={styles.topCodingExp}>{user?.nickName}</Text>
    </View>
  );
};

export default Home;
