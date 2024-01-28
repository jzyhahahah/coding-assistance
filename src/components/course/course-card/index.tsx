import { Progress, Space, Tag } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

interface CourseCardProps {
  courseName: string;
  tags: string[];
  progress?: number;
  src?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseName, tags, progress, src }) => {
  return (
    <>
      <View className={styles.courseCardContainer}>
        <View className={styles.courseCard}>
          <Space direction="vertical">
            <View className={styles.courseName}>{courseName}</View>
            <Space className={styles.courseTagContainer}>
              {tags?.map((item, index) => {
                return (
                  <Tag key={index} type="info">
                    {item}
                  </Tag>
                );
              })}
            </Space>
            <Progress
              percent={progress}
              color="rgb(255 223 15)"
              showText
              strokeWidth="5"
              animated
            />
          </Space>
        </View>
        {/* <Divider style={{ borderColor: '#cccccc' }} /> */}
      </View>
    </>
  );
};
export default CourseCard;
