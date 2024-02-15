import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { CourseFragmentRequest, CourseFragmentResponse } from './define';

export const getCourseFragmentCloudFunction = async (
  params: CourseFragmentRequest
): Promise<CourseFragmentResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getCourseFragment',
    data: params
  })) as any;
  return resp?.result;
};

export const useGetCourseFragment = (params: CourseFragmentRequest) => {
  return useRequest(async () => {
    const reps = await getCourseFragmentCloudFunction(params);
    return reps;
  });
};
