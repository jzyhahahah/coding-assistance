import { Progress, Space, Tag } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import styles from './index.module.scss';

interface CourseCardProps {
  courseID: string;
  courseName: string;
  tags: string[];
  progress?: number;
  src?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseID, courseName, tags, progress, src }) => {
  return (
    <>
      <View
        className={styles.courseCardContainer}
        onClick={() => {
          Taro.navigateTo({
            url: `/pages/course-detail/index?courseId=${courseID}`
          });
        }}
      >
        <View className={styles.courseCard}>
          <Space direction="vertical">
            <View className={styles.courseName}>{courseName}</View>
            <Space className={styles.courseTagContainer} wrap>
              {tags?.map((item, index) => {
                return (
                  <Tag key={index} type="info">
                    {item}
                  </Tag>
                );
              })}
            </Space>
            {progress !== undefined && (
              <Progress
                percent={progress}
                color="rgb(255 223 15)"
                showText
                strokeWidth="5"
                animated
              />
            )}
          </Space>
        </View>
      </View>
    </>
  );
};
export default CourseCard;
