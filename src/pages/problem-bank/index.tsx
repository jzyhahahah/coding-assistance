import ProblemCard from '@/components/problem/problem-card';
import { Button, Checkbox, Form, SearchBar } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.scss';

const checkBoxList = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '单选题',
    value: 'singleChoice'
  },
  {
    label: '多选题',
    value: 'multipleChoice'
  },
  {
    label: '判断题',
    value: 'TrueOrFalse'
  },
  {
    label: '填空题',
    value: 'fillInBlank'
  },
  {
    label: '简答题',
    value: 'shortAnswer'
  }
];

const ProblemBankPage = () => {
  const [checkboxgroup1, setCheckboxgroup1] = useState(['1']);
  const [form] = Form.useForm();
  return (
    <View className={styles.container}>
      <Form
        form={form}
        onFinish={(value) => {
          console.log(value);
        }}
      >
        <Form.Item name="keyWord">
          <SearchBar shape="round" />
        </Form.Item>
        <View className={styles.filterContainer}>
          <Form.Item name="problemType">
            <Checkbox.Group direction="horizontal">
              <View className={styles.row}>
                {checkBoxList.slice(0, 3).map((item) => {
                  return (
                    <Checkbox
                      value={item.value}
                      shape="button"
                      key={item.value}
                      className={styles.filterCheckBox}
                    >
                      {item.label}
                    </Checkbox>
                  );
                })}
              </View>
              <View className={styles.row}>
                {checkBoxList.slice(3, 6).map((item) => {
                  return (
                    <Checkbox
                      value={item.value}
                      shape="button"
                      key={item.value}
                      className={styles.filterCheckBox}
                    >
                      {item.label}
                    </Checkbox>
                  );
                })}
              </View>
            </Checkbox.Group>
          </Form.Item>
          <Button type="primary" formType="submit" block>
            搜索
          </Button>
        </View>
      </Form>
      <View className={styles.problemCardsContainer}>
        <ProblemCard />
      </View>
    </View>
  );
};

export default ProblemBankPage;
