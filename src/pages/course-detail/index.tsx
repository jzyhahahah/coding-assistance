import { useAddCourse } from '@/api/course/addCourse';
import { useGetCourseFragment } from '@/api/course/getCourseFragment';
import { useUpdateCourseProgress } from '@/api/course/updateCourseProgress';
import CourseFragmentCard from '@/components/course/course-fragment-card';
import { Loading1, PlayCircleFill } from '@nutui/icons-react-taro';
import { Dialog, Empty, Skeleton, Video } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const CourseDetail = () => {
  const [source, setSource] = useState({
    src: '',
    type: 'video/mp4'
  });
  const route = Taro.useRouter();
  const {
    data: fragments,
    loading,
    refresh
  } = useGetCourseFragment({
    courseId: route.params.courseId || ''
  });
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { runAsync: addCourse } = useAddCourse();
  const { runAsync: updateCourseFragment } = useUpdateCourseProgress();
  const options = {
    controls: true
  };

  useEffect(() => {
    setVisible(fragments?.errMsg === 'NoChoosed');
    if (fragments?.list?.length || 0 > 0) {
      setSelectedIndex(1);
      setSource({
        src: fragments?.list?.[0]?.videoUrl || '',
        type: 'video/mp4'
      });
    }
  }, [fragments]);

  useEffect(() => {
    if (fragments?.list[selectedIndex - 1].type === 'video') {
      setSource({
        src: fragments?.list?.[selectedIndex - 1]?.videoUrl || '',
        type: 'video/mp4'
      });
    } /* else if (fragments?.list[selectedIndex - 1].type === 'paper') {
      Taro.navigateTo({
        url: `/pages/paper/index?fragmentId=${fragments?.list?.[selectedIndex - 1]?.fragmentId}&courseId=${route?.params?.courseId}`
      });
    } */
  }, [selectedIndex])

  const handleUpdateCourseProgress = async () => {
    const fragmentId = fragments?.list?.[selectedIndex - 1]?.fragmentId || '';
    updateCourseFragment({
      courseId: route?.params?.courseId || '',
      fragmentId
    });
  };

  return (
    <>
      <View>
        <Video
          options={options}
          source={source}
          style={{ height: '200px' }}
          className={styles.video}
          onPlayEnd={handleUpdateCourseProgress}
        />
        <View className={styles.courseDir}>{'课程目录'}</View>
        <View className={styles.fragmentContainer}>
          {loading ? (
            <Skeleton rows={10} animated />
          ) : fragments?.errMsg !== 'NoChoosed' ? (
            fragments?.list?.length! > 0 ? fragments?.list.map((item, index) => (
              <CourseFragmentCard
                key={item.fragmentId}
                index={index + 1}
                title={item.fragmentTitle}
                style={
                  index + 1 === selectedIndex
                    ? { backgroundColor: 'rgba(253,240,15,0.1)', transition: 'all 0.2s ease-in' }
                    : {}
                }
                onClick={() => {
                  setSelectedIndex(index + 1)
                  if (item.type === 'paper') {
                    Taro.navigateTo({
                      url: `/pages/paper/index?fragmentId=${fragments?.list?.[index]?.fragmentId}&courseId=${route?.params?.courseId}&paperId=${fragments?.list?.[index]?.paperId}&fragmentTitle=${fragments?.list?.[index]?.fragmentTitle}
                      `
                    });
                  }
                }}
                icon={
                  index + 1 === selectedIndex ? (
                    <Loading1 />
                  ) : (
                      <PlayCircleFill size={20} color="#666666" />
                    )
                }
              />
            )) : <Empty description="暂无内容" imageSize={80} />
          ) : (
                <Dialog
                  title="暂未选择该课程"
                  visible={visible}
                  onConfirm={async () => {
                    setVisible(false);
                    const res = await addCourse({ courseId: route?.params?.courseId || '' });
                    if (res?.errMsg.indexOf('ok') !== -1) {
                      Taro.showToast({
                        title: '选择成功',
                        icon: 'success',
                        duration: 2000
                      });
                    }
                    // 刷新课程页面
                    refresh();
                    return () => { }; // 返回一个空函数
                  }}
                  onCancel={() => {
                    setVisible(false);
                    Taro.navigateBack();
                  }}
                >
                  {'您是否要选择该课程？'}
                </Dialog>
              )}
        </View>
      </View>
    </>
  );
};

export default CourseDetail;
