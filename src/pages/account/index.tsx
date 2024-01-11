import { useLogin } from '@/api/user/index';
import consultQr from '@/assets/consult_qr.png';
import { useGetSafeHeight } from '@/common/hooks';
import { Message, My, RectRight, Setting, Star } from '@nutui/icons-react-taro';
import { Avatar, Button, Cell, Dialog } from '@nutui/nutui-react-taro';
import { Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import styles from './index.module.scss';

const Account = () => {
  const height = useGetSafeHeight();
  const [contactShow, setContactShow] = useState(false);
  const { runAsync: runLogin } = useLogin();

  const handlerLogin = () => {
    wx.login({
      success(res) {
        runLogin({ code: res.code });
      }
    });
  };

  return (
    <div className={styles.account} style={{ height }}>
      <div className={styles.info}>
        <Avatar size="large" shape="square" icon={<My />} />
        <div className={styles.name}>
          <Button onClick={handlerLogin}>{'登录'}</Button>
          <div className={styles.realname}>{}</div>
          {/* <div className={styles.username}>
            {getDescription(lang, '用户名')}
            {'Light'}
          </div> */}
        </div>
      </div>
      <Cell
        title={
          <div className="cell">
            <Message size="16" />
            {'联系小助理'}
          </div>
        }
        onClick={() => setContactShow(true)}
        extra={<RectRight />}
      />
      <Cell.Group>
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我是标题
            </div>
          }
          extra={<RectRight />}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我是标题
            </div>
          }
          extra={<RectRight />}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我是标题
            </div>
          }
          extra={<RectRight />}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我是标题
            </div>
          }
          extra={<RectRight />}
        />
      </Cell.Group>
      <Cell
        title={
          <div className="cell">
            <Setting size="16" />
            {'设置'}
          </div>
        }
        onClick={() => Taro.navigateTo({ url: '/components/account/settings/index' })}
        extra={<RectRight />}
      />
      <Dialog visible={contactShow} className={styles.contact} footer={null} onClose={() => setContactShow(false)}>
        <Image src={consultQr} className={styles.qr} />
        <div className={styles.contact_bottom}>{'微信扫码'}</div>
      </Dialog>
    </div>
  );
};

export default Account;
