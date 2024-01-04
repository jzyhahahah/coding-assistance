import consultQr from '@/assets/consult_qr.png';
import { useGetSafeHeight } from '@/common/hooks';
import { useLang } from '@/components/hoc/with-lang/define';
import { Message, My, RectRight, Setting, Star } from '@nutui/icons-react-taro';
import { Avatar, Cell, Dialog } from '@nutui/nutui-react-taro';
import { Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { getDescription } from 'x-star-utils';
import styles from './index.module.scss';

const Account = () => {
  const { lang } = useLang();
  const height = useGetSafeHeight();
  const [contactShow, setContactShow] = useState(false);

  return (
    <div className={styles.account} style={{ height }}>
      <div className={styles.info}>
        <Avatar size="large" shape="square" icon={<My />} />
        <div className={styles.name}>
          <div className={styles.realname}>{'陈亮亮'}</div>
          <div className={styles.username}>
            {getDescription(lang, '用户名')}
            {'Light'}
          </div>
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
