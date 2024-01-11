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

/* export const useLogin = () => {
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
}; */

/* const get = async (): Promise<getRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'get'
  })) as any;
  return resp;
}; */

/* export const useGetDemo = () => {
  return useRequest(
    async () => {
      const resp = await get({ id: 1 });
      return resp.data;
    },
    {
      manual: false
    }
  );
}; */
