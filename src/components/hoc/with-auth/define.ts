import { LoginRequest, LoginRespones } from '@/api/user/define';

export type UserInfo = {
  _id: string;
  _openid: string;
  nickName: string;
  gender: number;
  language: string;
  city: string;
  province: string;
  country: string;
  avatarUrl: string;
  state: string;
};

export type AuthInfo = {
  user?: UserInfo | null;
  setUser: (user: UserInfo) => void;
  login: (req: LoginRequest) => Promise<LoginRespones> | (() => Promise<void>);
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};
