import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';

interface LoginRequest {
  code: string;
}
interface getRespones {
  code: number;
  msg: number;
  data: string;
}
interface LoginRequest {
  code: string;
}

const login = async (req: LoginRequest): Promise<any> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'login',
    data: {
      code: req.code
    }
  })) as any;
  return resp;
};

export const useLogin = () => {
  return useRequest(
    async (params: LoginRequest) => {
      const resp = await login(params);
      return resp;
    },
    {
      manual: true
      //onError:useErrorHandler
    }
  );
};

const get = async (): Promise<getRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'get'
  })) as any;
  return resp;
};

export const useGetDemo = () => {
  return useRequest(
    async () => {
      const resp = await get({ id: 1 });
      return resp.data;
    },
    {
      manual: false
    }
  );
};
