import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { GetPaperResponse, getPaperRequest } from './define';

export const getPaperCloudFunction = async (
  params: getPaperRequest
): Promise<GetPaperResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getPaper',
    data: params
  })) as any;
  return resp?.result;
};

export const useGetPaper = (params: getPaperRequest) => {
  return useRequest(
    async () => {
      const reps = await getPaperCloudFunction(params);
      return reps.list;
    }
  );
};
