import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { ChatParams, ChatResponse } from './define';

export const useChat = () => {
  return useRequest(
    async (params: ChatParams) => {
      const res = await Taro.request({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-0205?access_token=24.4fb883402d35e62e4a14b48690fad812.2592000.1715348621.282335-60744639',
        method: 'POST',
        data: params
      });
      return res.data as ChatResponse;
    },
    {
      manual: true
    }
  );
};
