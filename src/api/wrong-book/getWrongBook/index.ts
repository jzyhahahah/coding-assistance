import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { GetWrongBookRespones } from './define';

export const getWrongProblemCloudFunction = async (): Promise<GetWrongBookRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getWrongProblem'
  })) as any;
  return resp;
};

export const useGetWrongProblem = () => {
  return useRequest(async () => {
    const reps = await getWrongProblemCloudFunction();
    return reps.result;
  });
};
