export type UserInfo = {
  openid: number;
  CreateAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  ModifyRealName: boolean;
  userName: string;
  password: string;
  realName: string;
  phone: string;
  email: string;
  wechatOpenid: string;
  signature: string;
  gender: number;
  school: string;
  birthday: string;
  province: string;
  city: string;
  area: string;
  address: string;
  postcode: string;
  awards: string;
  resource: string[];
  state: string;
};

export type AuthInfo = {
  user?: UserInfo | null;
  login: () => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};
