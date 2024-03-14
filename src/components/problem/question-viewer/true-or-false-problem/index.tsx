import { Radio } from '@nutui/nutui-react-taro';
import { View, RichText } from '@tarojs/components';
import React, { useMemo, useState } from 'react';
import { Question } from '../define';
import styles from './index.module.scss';
import {
  TaroRichText
} from 'taro_rich_text';

interface QuestionViewerProps {
  question: Question;
  changeAnswer: boolean;
  className?: string;
}

const TrueOrFalseProblemViewer: React.FC<QuestionViewerProps> = ({
  question,
  changeAnswer,
  className
}) => {
  const [value, setValue] = useState<boolean>();
  const options = useMemo(
    () =>
      [
        { label: 'T', value: 'T' },
        { label: 'F', value: 'F' }
      ].map((option) => (
        <Radio className={styles.option} key={option.label} value={option.value}>
          <span className={styles.label}>{option.label}</span>
        </Radio>
      )),
    [question]
  );

  return (
    <View className={`${styles.question} ${className}`} id={`${question._id}`}>
      <View className={styles.title}>{question.problemStatement}</View>
      <Radio.Group
        value={value || question.answer ? 'T' : 'F'}
        className={styles.Radio}
        disabled={!changeAnswer}
      >
        {options}
      </Radio.Group>
    </View>
  );
};

export default TrueOrFalseProblemViewer;
