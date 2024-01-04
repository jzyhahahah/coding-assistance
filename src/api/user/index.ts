import { createApi } from 'x-star-query';
import { useErrorHandler } from '..';
import { LoginRequest, LoginResponse } from './define';

export const { usePasswordLoginMutate } = createApi({
  /**
   * 全局 axios 配置
   */
  axiosConfig: { baseURL: 'https://id-api.test.turingstar.com.cn' },

  /**
   * 全局响应转换
   */
  transformResponse: (data) => {
    if (data.code !== 200) {
      throw new Error(data.code + ': ' + data.msg);
    }
    return data.data;
  },

  /**
   * 接口定义
   */
  endpoints: (builder) => ({
    passwordLogin: builder.mutate<LoginResponse, void, LoginRequest>({
      query: '/login_oauth' + '?' + window.location.search.slice(1)
    })
  }),

  useErrorHandler: useErrorHandler
});
