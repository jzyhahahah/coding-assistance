import { useGetAllCourse } from '@/api/course/getAllCourse';
import CourseCard from '@/components/course/course-card';
import { SearchBar, Skeleton, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

const Course = () => {
  const { data: allCourses, runAsync: getSearchedCoures, loading } = useGetAllCourse();

  return (
    <View className={styles.container}>
      <View className={styles.topSearch}>
        <SearchBar
          shape="round"
          maxLength={20}
          placeholder="请输入课程名称"
          onChange={(value) => {
            getSearchedCoures({ courseName: value });
          }}
        />
      </View>
      <View className={styles.courseList}>
        {loading ? (
          <Skeleton rows={20} title animated className={styles.skeleton} />
        ) : (
          <Space direction="vertical" style={{ gap: 8 }}>
            {allCourses?.map((item) => {
              return (
                <CourseCard
                  key={item.courseId}
                  courseName={item.courseName}
                  tags={item.tags}
                  courseID={item.courseId}
                />
              );
            })}
          </Space>
        )}
      </View>
    </View>
  );
};

export default Course;
