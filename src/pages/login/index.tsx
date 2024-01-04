import { usePasswordLoginMutate } from '@/api/user';
import xyd_Logo from '@/assets/xyd_logo_white.png';
import { Button, Input, Tabs } from '@nutui/nutui-react-taro';
import { Image } from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.scss';

const Login = () => {
  const [username, setUsername] = useState('Light');
  const [password, setPassword] = useState('Jack865067066');
  const [tabValue, setTabValue] = useState<number | string>(0);

  const handleSubmit = () => {
    // 这里可以执行登录操作，例如调用 API
    console.log(username, password);
    login({
      username,
      password,
      loginmode: 'normal'
    });
  };

  const { runAsync: login } = usePasswordLoginMutate();

  return (
    <div className={styles.loginPage}>
      <Image src={xyd_Logo} className={styles.logo} />

      <Tabs
        value={tabValue}
        onChange={(value) => {
          setTabValue(value);
        }}
        className={styles.form}
      >
        <Tabs.TabPane title="密码登陆">
          <Input className={styles.input} type="text" placeholder="用户名/手机号码/邮箱" value={username} onChange={(v) => setUsername(v)} />
          <Input className={styles.input} type="password" placeholder="密码" value={password} onChange={(v) => setPassword(v)} />
          <Button className={styles.button} onClick={handleSubmit} block type="primary">
            {'登录'}
          </Button>
        </Tabs.TabPane>
        <Tabs.TabPane title="验证码登陆"> Tab 2 </Tabs.TabPane>
      </Tabs>
      <div className={styles.footer}>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          {'浙ICP备2020039208号-3'}
        </a>
        <div>{'版权所有©杭州信友队教育科技有限公司'}</div>
        <div>{'联系邮箱：feedback@xinyoudui.com'}</div>
        <div>{'联系电话：17367064678'}</div>
      </div>
    </div>
  );
};

export default Login;
