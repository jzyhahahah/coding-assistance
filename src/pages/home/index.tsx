import { useLang } from '@/components/hoc/with-lang/define';
import { Button, CalendarCard } from '@nutui/nutui-react-taro';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const Home = () => {
  const { lang, toggle, format: t } = useLang();

  const date = new Date('2023-01-01');
  return (
    <View className="index">
      <Text>{t('Home')}</Text>
      <Text>{lang}</Text>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: '/pages/login/index' });
        }}
      >
        jump
      </Button>
      <Button onClick={toggle}>toggle</Button>
      <CalendarCard defaultValue={date} />
    </View>
  );
};

export default Home;
