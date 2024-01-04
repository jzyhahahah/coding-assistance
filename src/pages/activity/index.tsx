import { Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

const Activity = () => {
  useLoad(() => {
    console.log('Activity Page loaded.');
  });

  return (
    <View className="index">
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
      <Text>Activity</Text>
    </View>
  );
};

export default Activity;
