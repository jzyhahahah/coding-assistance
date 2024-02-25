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
        <ProblemCard
          question={{
            type: 'singleChoice',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            options: [
              { choice: '#include <iostream>', id: '1', sequence: 1 },
              { choice: '#include "myheader.h"', id: '2', sequence: 2 },
              { choice: '#include', id: '3', sequence: 3 },
              { choice: '#include <myheader>', id: '4', sequence: 4 }
            ],
            solution: '为什么为什么',
            answer: ['1'],
            _id: '123'
          }}
        />
        <ProblemCard
          question={{
            type: 'multipleChoice',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            options: [
              { choice: '#include <iostream>', id: '1', sequence: 1 },
              { choice: '#include "myheader.h"', id: '2', sequence: 2 },
              { choice: '#include', id: '3', sequence: 3 },
              { choice: '#include <myheader>', id: '4', sequence: 4 }
            ],
            solution: '为什么为什么',
            answer: ['1', '2'],
            _id: '123'
          }}
        />
        <ProblemCard
          question={{
            type: 'TrueOrFalse',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            solution: '为什么为什么',
            answer: true,
            _id: '123'
          }}
        />
        <ProblemCard
          question={{
            type: 'TrueOrFalse',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            solution: '为什么为什么',
            answer: true,
            _id: '123'
          }}
        />
        <ProblemCard
          question={{
            type: 'fillInBlank',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            solution: '为什么为什么',
            answer: ['hahah', 'hello'],
            _id: '123'
          }}
        />
        <ProblemCard
          question={{
            type: 'shortAnswer',
            problemStatement:
              '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```',
            solution: '为什么为什么',
            answer: '我的答案我的答案我的答案我的答案',
            _id: '123'
          }}
        />
      </View>
    </View>
  );
};

export default ProblemBankPage;
