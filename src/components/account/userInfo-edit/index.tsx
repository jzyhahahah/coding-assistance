/* eslint-disable import/first */
import provinceCity from '@/assets/address';
import MyAddress from '@/components/common/MyAddress';
import { useAuth } from '@/components/hoc/with-auth';
import { Button, Form, Image, Input, Radio } from '@nutui/nutui-react-taro';
import { useState } from 'react';
import styles from './index.module.scss';

const UserInfoEdit = () => {
  const [addressVisible, setAddressVisible] = useState(false);
  const { user } = useAuth();
  const [form] = Form.useForm();
  /*   const handleUpload = () => {
    console.log(1);
    Taro.chooseMedia({
      count: 1,
      sizeType: ['original'],
      success: (e) => console.log(e)
    });
  }; */
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topTextInfo}>
          <span className={styles.textSpan}>{'完善用户资料'}</span>
        </div>
        <div className={styles.userEditForm}>
          <Form
            className={styles.form}
            // initialValues={{
            //   nickName: user?.nickName,
            //   gender: user?.gender,
            //   province: [user?.province, user?.city],
            //   coding: '无编程基础'
            // }}
            form={form}
            onFinish={(val) => {
              console.log(val);
            }}
            footer={
              <>
                <Button formType="submit" block type="primary">
                  提交
                </Button>
              </>
            }
          >
            <Image
              src={user?.avatarUrl}
              className={styles.image}
              radius="50%"
              width="80"
              height="80"
              fadeIn
            />
            <Form.Item
              required
              label="昵称"
              name="nickName"
              initialValue={user?.nickName}
              //rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input className="nut-input-text" placeholder="请输入昵称" type="text" />
            </Form.Item>
            <Form.Item
              required
              label="性别"
              name="gender"
              initialValue={user?.gender}
              //rules={[{ required: true, message: '请输入性别' }]}
            >
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
              //rules={[{ required: true, message: '请选择地址' }]}
            >
              <MyAddress
                visible={addressVisible}
                options={provinceCity}
                onClose={() => {
                  setAddressVisible(false);
                }}
              />
            </Form.Item>
            <Form.Item
              required
              label="编程基础"
              name="coding"
              //rules={[{ required: true, message: '请选择您的编程基础' }]}
            >
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
