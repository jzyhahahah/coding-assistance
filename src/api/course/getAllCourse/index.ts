import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { getAllCourseRequest, getAllCourseRespones } from './define';

export const getAllCourseCloudFunction = async (
  params: getAllCourseRequest
): Promise<getAllCourseRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getAllCourse',
    data: params
  })) as any;
  return resp?.result;
};

export const useGetAllCourse = () => {
  return useRequest(
    async (params: getAllCourseRequest) => {
      const reps = await getAllCourseCloudFunction(params);
      return reps;
    },
    {
      debounceWait: 1500,
      manual: true
    }
  );
};
