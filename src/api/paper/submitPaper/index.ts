import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { submitPaperRequest, submitPaperResponse } from './define';

export const submitPaperCloudFunction = async (
  params: submitPaperRequest
): Promise<submitPaperResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'submitPaper',
    data: params
  })) as any;
  return resp?.result;
};

export const useSubmitPaper = () => {
  return useRequest(
    async (params: submitPaperRequest) => {
      const reps = await submitPaperCloudFunction(params);
      return reps;
    },
    {
      manual: true
    }
  );
};
