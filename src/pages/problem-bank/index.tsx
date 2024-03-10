import { useGetProblem } from '@/api/problem/getProblem';
import ProblemCard from '@/components/problem/problem-card';
import {
  Button,
  Checkbox,
  Form,
  Pagination,
  SearchBar,
  Skeleton,
  Space
} from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const checkBoxList = [
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
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const {
    data: problems,
    runAsync: getProblems,
    loading,
    params: lastParams
  } = useGetProblem({ current, pageSize });
  const [form] = Form.useForm();

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    getProblems({ ...lastParams[0], current, pageSize });
  }, [current, pageSize]);

  return (
    <View className={styles.container}>
      <Form
        form={form}
        onFinish={(value) => {
          getProblems({ ...value, current, pageSize });
        }}
      >
        <Form.Item name="problemStatement">
          <SearchBar shape="round" />
        </Form.Item>
        <View className={styles.filterContainer}>
          <Form.Item name="category">
            <Checkbox.Group
              direction="horizontal"
              onChange={(val) => {
                console.log(val);
              }}
            >
              <Space wrap style={{ marginBottom: 10 }}>
                {checkBoxList.map((item) => {
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
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Button type="primary" formType="submit" block>
            搜索
          </Button>
        </View>
      </Form>
      <View className={styles.problemCardsContainer}>
        <Space direction="vertical">
          {!loading ? (
            problems?.list.map((problem) => {
              return <ProblemCard question={problem} key={problem._id} />;
            })
          ) : (
            <Skeleton rows={10} animated />
          )}
        </Space>
      </View>
      {problems && (
        <Pagination
          value={current}
          total={problems?.total}
          pageSize={pageSize}
          onChange={handlePageChange}
          className={styles.Pagination}
        />
      )}
    </View>
  );
};

export default ProblemBankPage;
