import { useErrorHandler } from '@/api';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { GetMyGradeListRequest, GetMyGradeListResponse } from './define';

export const getMyGradeListCloudFunction = async (
  params: GetMyGradeListRequest
): Promise<GetMyGradeListResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getMyGradeList',
    data: params
  })) as any;
  return resp?.result;
};

export const useGetMyGradeList = () => {
  return useRequest(
    async (params: GetMyGradeListRequest = {}) => {
      const reps = await getMyGradeListCloudFunction(params);
      return reps;
    },
    {
      onError: useErrorHandler()
    }
  );
};
