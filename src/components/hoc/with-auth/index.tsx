import { LoginRequest } from '@/api/user/define';
import { Col, Row, Space } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import React, { useCallback, useContext } from 'react';
import { AuthInfo, UserInfo } from './define';

const showWarning = async () => {
  console.warn('AuthContext has not been provided. You are calling a noop function.');
};

const AuthContext = React.createContext<AuthInfo>({
  user: null,
  login: showWarning,
  refresh: showWarning,
  logout: showWarning
});

const loginCloudFunction = async (req: LoginRequest): Promise<UserInfo> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'login',
    data: {
      code: req.code
    }
  })) as any;
  return resp;
};

const RainbowCat: React.FC<{ text: string }> = ({ text }) => (
  <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
    <Col style={{ textAlign: 'center' }}>
      <Space direction="vertical">
        <img src="https://static.production.xjoi.net/images/emoticon-1.gif" alt="" />
        <Space>
          {text}
          <span>...</span>
        </Space>
      </Space>
    </Col>
  </Row>
);

export const WithAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    data: user,
    loading,
    refreshAsync
  } = useRequest(
    async (params: LoginRequest) => {
      const resp = await loginCloudFunction(params);
      if (resp.state === 'noRegistered') {
        Taro.navigateTo({ url: '/components/account/settings/index' });
      }
      return resp;
    },
    {
      manual: true
      //onError:useErrorHandler
    }
  );
  const login = () => {
    return refresh?.();
  };

  const refresh = useCallback(async () => {
    await refreshAsync();
  }, [refreshAsync]);

  const logout = () => {};
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        refresh,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { RainbowCat, useAuth };
