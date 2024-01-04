export interface LoginRequest {
  username: string;
  password: string;
  loginmode?: string;
}

export interface LoginResponse {
  code: number;
  msg: string;
  data: {
    key: string;
  };
}
