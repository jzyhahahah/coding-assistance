import { Copy } from '@nutui/icons-react-taro';
import { Button, Divider, Space } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import QuestionViewer from '../question-viewer';
import { ChoiceOption, Question } from '../question-viewer/define';
import styles from './index.module.scss';

interface ProblemCardProps {
  className?: string;
  question: Question;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ className, question }) => {
  const questionTypeMap = {
    singleChoice: '单选题',
    multipleChoice: '多选题',
    TrueOrFalse: '判断题',
    fillInBlank: '填空题',
    shortAnswer: '简答题'
  };

  const renderAnswer = (type, answer: any, options?: ChoiceOption[]) => {
    switch (type) {
      case 'TrueOrFalse':
        return answer === true ? 'T' : 'F';
      case 'singleChoice':
        const singleChoiceAnswerStr =
          options &&
          options
            .filter((item) => answer.includes(item.id))
            .map((ans) => String.fromCharCode('A'.charCodeAt(0) + ans.sequence - 1));
        return singleChoiceAnswerStr;
      case 'multipleChoice':
        const multipleChoiceAnswerStr =
          options &&
          options
            .filter((item) => answer.includes(item.id))
            .map((ans) => String.fromCharCode('A'.charCodeAt(0) + ans.sequence - 1));
        return multipleChoiceAnswerStr?.join(',');
      case 'fillInBlank':
        return answer;
      case 'shortAnswer':
        return '见上';
    }
  };

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
          <span className={`${styles.ellipse} ${styles.textValue}`}>
            {questionTypeMap[question.type]}
          </span>
        </Space>
      </View>
      <QuestionViewer changeAnswer={false} className={styles.questionViewer} item={question} />
      <Divider className={styles.divider} />
      <View className={styles.bottomInfo}>
        <Space>
          <span className={styles.textLabel}>答案:</span>
          <span className={styles.textValue}>
            {renderAnswer(question?.type, question?.answer as string[], question?.option || [])}
          </span>
        </Space>
        <Space style={{ marginTop: '5px' }}>
          <span className={styles.textLabel}>解析:</span>
          <span className={styles.textValue}>{question?.solution || '暂无解析'}</span>
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
