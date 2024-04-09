import { useGetLikeProblemList } from '@/api/like/likeProblem';
import ProblemCard from '@/components/problem/problem-card';
import { Button, Checkbox, Form, SearchBar, Skeleton, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
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

const MyLikeProblem = () => {
  const { data: problemList, loading, runAsync } = useGetLikeProblemList();
  console.log('problemList', problemList);
  const [form] = Form.useForm();
  return (
    <View className={styles.container}>
      <Form
        form={form}
        onFinish={(value) => {
          runAsync({ ...value });
        }}
      >
        <Form.Item name="problemStatement">
          <SearchBar shape="round" />
        </Form.Item>
        <View className={styles.filterContainer}>
          <Form.Item name="type">
            <Checkbox.Group direction="horizontal" onChange={(val) => {}}>
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
            problemList?.likeProblems?.map((problem) => {
              return <ProblemCard question={problem} key={problem._id} />;
            })
          ) : (
            <Skeleton rows={10} animated />
          )}
        </Space>
      </View>
    </View>
  );
};

export default MyLikeProblem;
