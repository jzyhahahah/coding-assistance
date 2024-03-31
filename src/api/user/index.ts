import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import {
  getUserInfoRequest,
  getUserInfoRespones,
  updateUserInfoRequest,
  updateUserInfoRespones,
  updateUsernamesRequest,
  updateUsernamesRespones
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

const updateUsernamesCloudFunction = async (
  req: updateUsernamesRequest
): Promise<updateUsernamesRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'updateUsername',
    data: req
  })) as any;
  return resp?.result;
};

export const useUpdateUsername = () => {
  return useRequest(
    async (params: updateUsernamesRequest) => {
      const resp = await updateUsernamesCloudFunction(params);
      return resp;
    },
    {
      manual: true
    }
  );
};
