import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { getPaperReportRequest, getPaperReportResponse } from './define';

export const getPaperReportCloudFunction = async (
  params: getPaperReportRequest
): Promise<getPaperReportResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getPaperReport',
    data: params
  })) as any;
  return resp;
};

export const usePaperReport = (params: getPaperReportRequest) => {
  return useRequest(async () => {
    const reps = await getPaperReportCloudFunction(params);
    return reps.result;
  });
};
