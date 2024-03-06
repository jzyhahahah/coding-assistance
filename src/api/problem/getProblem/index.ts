import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { GetProblemRequest, GetProblemResponse } from './define';

export const getProblemCloudFunction = async (
  params: GetProblemRequest
): Promise<GetProblemResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getProblem',
    data: params
  })) as any;
  return resp?.result;
};

export const useGetProblem = ({ current, pageSize }) => {
  return useRequest(async (params: GetProblemRequest) => {
    const reps = await getProblemCloudFunction({
      ...params,
      current,
      pageSize,
      category:
        Array.isArray(params.category) && params.category.length > 0 ? params.category : undefined
    });
    return reps;
  });
};
