import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { AddCourseRequest, AddCourseResponse } from './define';

export const addCourseCloudFunction = async (
  params: AddCourseRequest
): Promise<AddCourseResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'addCourse',
    data: params
  })) as any;
  return resp?.result;
};

export const useAddCourse = () => {
  return useRequest(
    async (params: AddCourseRequest) => {
      const reps = await addCourseCloudFunction(params);
      return reps;
    },
    {
      manual: true
    }
  );
};
