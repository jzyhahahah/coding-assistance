import { useGetAllCourse } from '@/api/course/getAllCourse';
import { useGetAllMyCourse } from '@/api/course/getMyCourses';
import swiper1 from '@/assets/swiper/swiper-1.jpg';
import swiper2 from '@/assets/swiper/swiper-2.jpg';
import swiper3 from '@/assets/swiper/swiper-3.jpg';
import swiper4 from '@/assets/swiper/swiper-4.jpg';
import CourseCard from '@/components/course/course-card';
import { useAuth } from '@/components/hoc/with-auth';
import { Button, Empty, Grid, Progress, Space, Swiper, Tabs } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useEffect } from 'react';
import styles from './index.module.scss';

const Home = () => {
  //const { lang, toggle, format: t } = useLang();
  const swipers = [swiper1, swiper2, swiper3, swiper4];
  const { data: allCourses, runAsync: getAll } = useGetAllCourse();
  const { data: myCourse, runAsync: getMy } = useGetAllMyCourse();
  const { user, isLogined } = useAuth();

  useEffect(() => {
    if (isLogined) {
      getAll({ courseName: undefined });
      getMy();
    }
  }, [isLogined]);

  return (
    <>
      <View className={styles.container}>
        {isLogined ?
          <>
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
                    <View style={{ color: '#666666' }}>{'已连续学习'}</View>
                  </Space>
                </View>
              </Space>
            </View>
          </> : <View className={styles.noLogin}>{"请先登录"}</View>
        }
      </View>
      <View className={styles.bottomContainer}>
        <Grid className={styles.linkBtns} columns={2}>
          <Grid.Item>
            <Button
              className={styles.linkBtn}
              onClick={() => Taro.navigateTo({ url: '/pages/problem-bank/index' })}
            >
              试题库
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button className={styles.linkBtn}>错题本</Button>
          </Grid.Item>
          <Grid.Item>
            <Button className={styles.linkBtn}>我的收藏</Button>
          </Grid.Item>
          <Grid.Item>
            <Button className={styles.linkBtn}>学习资料</Button>
          </Grid.Item>
        </Grid>
        <Swiper defaultValue={0} indicator className={styles.homeSwiper}>
          {swipers.map((item, index) => {
            return (
              <Swiper.Item key={item}>
                <img
                  width="100%"
                  height="100%"
                  src={item}
                  onClick={() => console.log(index)}
                  alt=""
                />
              </Swiper.Item>
            );
          })}
        </Swiper>
        <Tabs activeType="smile" className={styles.tabs}>
          <Tabs.TabPane title="我的课程">
            <Space direction="vertical" style={{ gap: 8 }}>
              {isLogined ? myCourse?.list?.map((item) => {
                return (
                  <CourseCard
                    key={item.courseId}
                    courseID={item.courseId}
                    courseName={item.courseName}
                    tags={item.tags}
                    progress={item?.progress}
                  />
                );
              }) : <Empty className={styles.Empty} description="请先登录" />}
            </Space>
          </Tabs.TabPane>
          <Tabs.TabPane title="全部课程">
            <Space direction="vertical">
              {isLogined ? allCourses?.map((item) => {
                return (
                  <CourseCard
                    key={item.courseId}
                    courseName={item.courseName}
                    tags={item.tags}
                    courseID={item.courseId}
                  />
                );
              }) : <Empty className={styles.Empty} description="请先登录" />}
            </Space>
          </Tabs.TabPane>

        </Tabs>
      </View>
    </>
  );
};

export default Home;
