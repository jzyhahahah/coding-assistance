import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { updateCourseProgressRequest, updateCourseProgressResponse } from './define';

export const updateCourseProgressCloudFunction = async (
  params: updateCourseProgressRequest
): Promise<updateCourseProgressResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'updateCourseProgress',
    data: params
  })) as any;
  return resp;
};

export const useUpdateCourseProgress = () => {
  return useRequest(
    async (params: updateCourseProgressRequest) => {
      const reps = await updateCourseProgressCloudFunction(params);
      return reps;
    },
    {
      manual: true
    }
  );
};
