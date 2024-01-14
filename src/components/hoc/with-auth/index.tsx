import { useGetUserInfo } from '@/api/user';
import { LoginRequest, LoginRespones } from '@/api/user/define';
import { Col, Row, Space } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthInfo, UserInfo } from './define';

const showWarning = async () => {
  console.warn('AuthContext has not been provided. You are calling a noop function.');
};

const AuthContext = React.createContext<AuthInfo>({
  user: null,
  setUser: showWarning,
  login: showWarning as any,
  refresh: showWarning,
  logout: showWarning
});

const loginCloudFunction = async (req: LoginRequest): Promise<LoginRespones> => {
  const resp = (await Taro.cloud.callFunction({
    name: 'login',
    data: {
      code: req.code,
      userRawData: req.userRawData
    }
  })) as any;
  return resp?.result;
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
  const [user, setUser] = useState<UserInfo | null>();
  const { runAsync: getUserInfoAysnc } = useGetUserInfo();
  const logoutSuccessMsg = '退出登录成功';
  const logoutErrorMsg = '退出登录失败';
  useEffect(() => {
    Taro.getStorage({
      key: '_openid',
      success: async function (res) {
        //console.log(res.data)
        const info = await getUserInfoAysnc({ _openid: res.data });
        setUser(info);
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }, []);
  const { loading, runAsync, refreshAsync } = useRequest(
    async (params: LoginRequest) => {
      const resp = await loginCloudFunction(params);
      Taro.setStorage({
        key: '_openid',
        data: resp.user._openid
      });
      return resp;
    },
    {
      throttleWait: 1000,
      manual: true
      //onError:useErrorHandler
    }
  );

  const login = useCallback(async (req: LoginRequest) => {
    const respUser = await runAsync?.(req);
    setUser(respUser.user);
    return respUser;
  }, []);

  const refresh = useCallback(async () => {
    await refreshAsync();
  }, [refreshAsync]);

  const logout = () => {
    setUser(null);
    try {
      Taro.removeStorage({
        key: '_openid',
        success: function (res) {
          Taro.switchTab({ url: '/pages/home/index' });
          Taro.showToast({
            title: logoutSuccessMsg,
            duration: 1500
          });
        }
      });
    } catch {}
  };
  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser,
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
