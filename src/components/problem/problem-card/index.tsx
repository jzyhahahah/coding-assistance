import { Copy } from '@nutui/icons-react-taro';
import { Button, Divider, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import QuestionViewer from '../question-viewer';
import styles from './index.module.scss';

interface ProblemCardProps {
  className?: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ className }) => {
  return (
    <View className={`${styles.container} ${className}`}>
      <View className={styles.topInfo}>
        <Space>
          <span className={styles.textLabel}>题目ID:</span>
          <span className={`${styles.ellipse} ${styles.textValue}`}>{122452452343456}</span>
          <Button
            type="primary"
            fill="none"
            icon={<Copy />}
            onClick={() => {
              Taro.setClipboardData({
                data: '122452452343456',
                success: function () {
                  Taro.showToast({
                    title: '复制成功',
                    icon: 'success'
                  });
                }
              });
            }}
            style={{
              width: '20px',
              height: '20px',
              verticalAlign: 'bottom'
            }}
          />
        </Space>
        <Space>
          <span className={styles.textLabel}>题型:</span>
          <span className={`${styles.ellipse} ${styles.textValue}`}>{'单选题'}</span>
        </Space>
      </View>
      {/*       <XStarMdViewer
        // value={
        //   '执行下列代码，最后运行结果是 1。 ```cpp #include <iostream> using namespace std; int main() { cout<<(3>2>1); return 0; } ```'
        // }
        value={'1515646'}
      /> */}
      <QuestionViewer
        changeAnswer={false}
        className={styles.questionViewer}
        item={{
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
      <Divider className={styles.divider} />
      <View className={styles.bottomInfo}>
        <Space>
          <span className={styles.textLabel}>答案:</span>
          <span className={styles.textValue}>{'A'}</span>
        </Space>
        <Space style={{ marginTop: '5px' }}>
          <span className={styles.textLabel}>解析:</span>
          <span className={styles.textValue}>
            {
              '为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么为什么'
            }
          </span>
        </Space>
        <Space style={{ marginTop: '5px' }}>
          <span className={styles.textLabel}>创建时间:</span>
          <span className={styles.textValue}>{'2021-10-10'}</span>
        </Space>
        <Space style={{ marginTop: '5px' }}>
          <span className={styles.textLabel}>创建人:</span>
          <span className={styles.textValue}>{'张三'}</span>
        </Space>
      </View>
    </View>
  );
};

export default ProblemCard;
