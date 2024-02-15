import { PlayCircleFill } from '@nutui/icons-react-taro';
import { Divider, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

interface CourseFragmentCardProps {
  index: number;
  title: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const CourseFragmentCard: React.FC<CourseFragmentCardProps> = ({
  index,
  title,
  style,
  icon,
  onClick
}) => {
  return (
    <View className={styles.container} style={style} onClick={onClick}>
      <Space>
        <span>{index}</span>
        <Divider direction="vertical" />
        <span>{title}</span>
      </Space>
      {icon ? icon : <PlayCircleFill size={20} color="#666666" />}
    </View>
  );
};

export default CourseFragmentCard;
