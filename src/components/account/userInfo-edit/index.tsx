import { useGetUserInfo, useUpdateUserInfo } from '@/api/user';
import provinceCity from '@/assets/address';
import MyAddress from '@/components/common/MyAddress';
import { useAuth } from '@/components/hoc/with-auth';
import { Button, Form, Input, Radio, Uploader } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import styles from './index.module.scss';

const UserInfoEdit = () => {
  const [addressVisible, setAddressVisible] = useState(false);
  const { user, refresh, setUser } = useAuth();
  const [form] = Form.useForm();
  const { runAsync: getUserInfoRunAsync } = useGetUserInfo();
  const { runAsync: updateRunAsync } = useUpdateUserInfo();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topTextInfo}>
          <span className={styles.textSpan}>{'完善用户资料'}</span>
        </div>
        <div className={styles.userEditForm}>
          <Form
            className={styles.form}
            form={form}
            onFinish={async (val) => {
              const province = val?.province?.[0];
              const city = val?.province?.[1];
              //let imgBase64 : string | ArrayBuffer;
              const imgBase64 = val?.avatarUrl?.[0]?.path
                ? Taro.getFileSystemManager().readFileSync(val?.avatarUrl?.[0]?.path, 'base64')
                : undefined;
              //console.log(imgBase64)
              const resp = await updateRunAsync({
                _openid: user?._openid,
                ...val,
                province,
                city,
                avatarUrl: imgBase64,
                oldAvaUrl: user?.avatarUrl
              });
              if (resp.errMsg === 'collection.update:ok') {
                Taro.showToast({
                  title: '信息修改成功',
                  duration: 1500
                });
                const resUser = await getUserInfoRunAsync({ _openid: user?._openid });
                setUser(resUser);
              }
            }}
            footer={
              <>
                <Button formType="submit" block type="primary">
                  提交
                </Button>
              </>
            }
          >
            <Form.Item name="avatarUrl">
              <Uploader
                className={styles.image}
                defaultValue={[
                  {
                    name: user?.nickName,
                    url: user?.avatarUrl,
                    status: 'success',
                    message: '上传成功',
                    type: 'image',
                    uid: user?._openid || ''
                  }
                ]}
                url="#"
              />
            </Form.Item>
            <Form.Item required label="昵称" name="nickName" initialValue={user?.nickName}>
              <Input className="nut-input-text" placeholder="请输入昵称" type="text" />
            </Form.Item>
            <Form.Item required label="性别" name="gender" initialValue={user?.gender}>
              <Radio.Group direction="horizontal" className={styles.Radio}>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              required
              label="地址"
              name="province"
              onClick={() => setAddressVisible(true)}
              initialValue={[user?.province, user?.city]}
            >
              <MyAddress
                visible={addressVisible}
                options={provinceCity}
                onClose={() => {
                  setAddressVisible(false);
                }}
              />
            </Form.Item>
            <Form.Item required label="编程基础" name="coding" initialValue={user?.coding}>
              <Radio.Group direction="horizontal" className={styles.Radio}>
                <Radio value="无编程基础">{'无编程基础'}</Radio>
                <Radio value="< 1年编程基础">{'< 1年编程基础'}</Radio>
                <Radio value=">1 年编程基础">{'>1 年编程基础'}</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <Button onClick={handleUpload}>2132</Button> */}
            {/*  <Form.Item label="Uploader" name="files" required>
              <Uploader
                defaultValue={[
                  {
                    name: '文件文件文件1.png',
                    url: user?.avatarUrl,
                    status: 'success',
                    message: '上传成功',
                    type: 'image',
                    uid: '123'
                  }
                ]}
              />
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserInfoEdit;
