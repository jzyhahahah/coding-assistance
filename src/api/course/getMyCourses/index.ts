import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { getAllMyCourseRespones } from './define';

export const getAllMyCourseCloudFunction = async (): Promise<getAllMyCourseRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getMyCourses'
  })) as any;
  return resp?.result;
};

export const useGetAllMyCourse = () => {
  return useRequest(async () => {
    const reps = await getAllMyCourseCloudFunction();
    return reps;
  });
};
