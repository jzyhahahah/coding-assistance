import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import {
  getUserInfoRequest,
  getUserInfoRespones,
  updateUserInfoRequest,
  updateUserInfoRespones
} from './define';

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

const updateUserInfoCloudFunction = async (
  req: updateUserInfoRequest
): Promise<updateUserInfoRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'updateUserInfo',
    data: req
  })) as any;
  return resp?.result;
};

export const useUpdateUserInfo = () => {
  return useRequest(
    async (params: updateUserInfoRequest) => {
      const resp = await updateUserInfoCloudFunction(params);
      return resp;
    },
    {
      manual: true
    }
  );
};
