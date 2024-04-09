import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import {
  AddLikeProblemRequest,
  GetLikeProblemListDetailRequest,
  GetLikeProblemListDetailResponse,
  GetLikeProblemListResponse,
  RemoveLikeProblemRequest
} from './define';

export const getLikeProblemListCloudFunction = async (): Promise<GetLikeProblemListResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getMyLikeProblem'
  })) as any;
  return resp.result?.data[0] || {};
};

export const useLikeProblemList = () => {
  return useRequest(async () => {
    const reps = await getLikeProblemListCloudFunction();
    return reps;
  });
};

export const addLikeProblemCloudFunction = async (req: AddLikeProblemRequest) => {
  const resp = (await Taro.cloud.callFunction({
    name: 'addLikeProblem',
    data: req
  })) as any;
  return resp.result;
};

export const useAddLikeProblem = () => {
  return useRequest(
    async (req: AddLikeProblemRequest) => {
      const reps = await addLikeProblemCloudFunction(req);
      return reps;
    },
    {
      manual: true
    }
  );
};

export const removeLikeProblemCloudFunction = async (req: RemoveLikeProblemRequest) => {
  const resp = (await Taro.cloud.callFunction({
    name: 'removeLikeProblem',
    data: req
  })) as any;
  return resp.result;
};

export const useRemoveLikeProblem = () => {
  return useRequest(
    async (req: RemoveLikeProblemRequest) => {
      const reps = await removeLikeProblemCloudFunction(req);
      return reps;
    },
    {
      manual: true
    }
  );
};

export const getLikeProblemList = async (
  req: GetLikeProblemListDetailRequest
): Promise<GetLikeProblemListDetailResponse> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'getMyLikeProblemDetail',
    data: req
  })) as any;
  return resp.result?.list[0] || {};
};

export const useGetLikeProblemList = () => {
  return useRequest(async (req: GetLikeProblemListDetailRequest) => {
    const reps = await getLikeProblemList(req);
    return reps;
  });
};
