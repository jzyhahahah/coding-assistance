import { Button } from '@nutui/nutui-react-taro';
import { Text, View } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import './index.scss';

const Course = () => {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="index">
      <Text>course</Text>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <div>course</div>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: '/pages/course/index' });
        }}
      >
        jump
      </Button>
      <Button type="primary">course主要按钮</Button>
    </View>
  );
};

export default Course;
