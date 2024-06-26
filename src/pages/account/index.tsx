import consultQr from '@/assets/consult_qr.png';
import { useGetSafeHeight } from '@/common/hooks';
import { useAuth } from '@/components/hoc/with-auth';
import { ArrowRight, Setting, Star } from '@nutui/icons-react-taro';
import { Avatar, Button, Cell, Dialog, Input } from '@nutui/nutui-react-taro';
import { Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import styles from './index.module.scss';

const Account = () => {
  const height = useGetSafeHeight();
  const [contactShow, setContactShow] = useState(false);
  const { login, user } = useAuth();
  const [visible, setVisible] = useState(false);

  const handlerLogin = async (e) => {
    e.stopPropagation();
    await Taro.getUserProfile({
      desc: '获取用户信息用于登录',
      success(info) {
        Taro.login({
          async success(res) {
            await login({
              code: res.code,
              userRawData: info.rawData
            });
          }
        });
      }
    });
  };

  const handleEditInfo = () => {
    Taro.navigateTo({
      url: '/components/account/userInfo-edit/index'
    });
  };

  return (
    <div className={styles.account} style={{ height }}>
      <div className={styles.info} onClick={handleEditInfo}>
        <Avatar size="large" shape="square" src={user?.avatarUrl} />
        <div className={styles.name}>
          {!user?._openid && <Button onClick={handlerLogin}>{'授权登录'}</Button>}
          <div className={styles.username}>{user?.nickName}</div>
          <div className={styles.username}>{user?.coding}</div>
        </div>
      </div>
      <Cell.Group>
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 试题库
            </div>
          }
          extra={<ArrowRight />}
          onClick={() => Taro.navigateTo({ url: '/pages/problem-bank/index' })}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我的收藏
            </div>
          }
          extra={<ArrowRight />}
          onClick={() => Taro.navigateTo({ url: '/pages/like/index' })}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 错题本
            </div>
          }
          extra={<ArrowRight />}
          onClick={() => Taro.navigateTo({ url: '/pages/wrong-book/index' })}
        />
        <Cell
          title={
            <div className="cell">
              <Star size="16" /> 我是标题
            </div>
          }
          extra={<ArrowRight />}
        />
      </Cell.Group>
      <Cell
        title={
          <div className="cell">
            <Setting size="16" />
            {'设置'}
          </div>
        }
        onClick={() =>
          Taro.navigateTo({
            url: '/components/account/settings/index'
          })
        }
        extra={<ArrowRight />}
      />
      <Dialog
        visible={contactShow}
        className={styles.contact}
        footer={null}
        onClose={() => setContactShow(false)}
      >
        <Image src={consultQr} className={styles.qr} />
        <div className={styles.contact_bottom}>{'微信扫码'}</div>
      </Dialog>
      <Dialog
        className="test-dialog"
        title="自定义内容区域"
        visible={visible}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        请修改用户名,有且仅有一次机会
        <Input
          placeholder="请输入文本"
          onChange={(v) => {
            console.log('onChange', v);
          }}
        />
      </Dialog>
    </div>
  );
};

export default Account;
