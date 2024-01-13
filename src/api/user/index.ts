import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { getUserInfoRequest, getUserInfoRespones } from './define';

const getUserInfoCloudFunction = async (req: getUserInfoRequest): Promise<getUserInfoRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getUserInfo',
    data: req
  })) as any;
  return resp?.result;
};

export const useGetUserInfo = () => {
  return useRequest(
    async (params: getUserInfoRequest) => {
      const resp = await getUserInfoCloudFunction(params);
      return resp.user;
    },
    {
      manual: true
    }
  );
};
