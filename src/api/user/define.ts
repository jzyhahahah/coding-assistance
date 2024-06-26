import { UserInfo } from '@/components/hoc/with-auth/define';

export interface LoginRequest {
  code: string;
  userRawData: string;
}
export interface LoginRespones {
  user: UserInfo;
}
export interface getUserInfoRequest {
  _openid?: string;
}
export interface getUserInfoRespones {
  user: UserInfo;
}

export interface updateUserInfoRequest {
  _openid: string;
  nickName?: string;
  gender?: number;
  province?: string[];
  coding?: string;
  avatarUrl?: string | ArrayBuffer;
  oldAvaUrl?: string;
}

export interface updateUserInfoRespones {
  errMsg: string;
  stats: {
    updated: number;
  };
}

export interface updateUsernamesRequest {
  username: string;
}

export interface updateUsernamesRespones {
  code: number;
  message: string;
}