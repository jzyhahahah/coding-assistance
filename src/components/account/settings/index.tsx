import { useAuth } from '@/components/hoc/with-auth';
import { useLang } from '@/components/hoc/with-lang/define';
import { Addfollow } from '@nutui/icons-react-taro';
import { Button, Cell, Picker } from '@nutui/nutui-react-taro';
import { useState } from 'react';
import styles from './index.module.scss';

const Settings = () => {
  const [langPickerVisible, setLangPickerVisible] = useState(false);
  const { lang, toggle } = useLang();
  const { user, logout } = useAuth();

  const langList = [
    [
      { value: 'zh', text: '中文' },
      { value: 'en', text: '英文' }
    ]
  ];
  return (
    <div className={styles.settings}>
      <Cell
        title={
          <div className="cell">
            <Addfollow size="16" />
            {'语言偏好'}
          </div>
        }
        onClick={() => setLangPickerVisible(true)}
        extra={langList[0].find((v) => v.value === lang)?.text}
      />
      {user?._openid && (
        <Button block type="danger" onClick={logout}>
          {'退出登录'}
        </Button>
      )}
      <Picker
        visible={langPickerVisible}
        options={langList}
        onConfirm={(_, values: (string | number)[]) => {
          if (values[0] !== lang) {
            toggle();
          }
        }}
        onClose={() => setLangPickerVisible(false)}
      />
    </div>
  );
};

export default Settings;
