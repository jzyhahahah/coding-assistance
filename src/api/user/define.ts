import { UserInfo } from '@/components/hoc/with-auth/define';

export interface LoginRequest {
  code: string;
  userRawData: string;
}
export interface LoginRespones {
  user: UserInfo;
}
export interface getUserInfoRequest {
  _openid: string;
}
export interface getUserInfoRespones {
  user: UserInfo;
}
