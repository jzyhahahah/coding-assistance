import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Space } from '@nutui/nutui-react-taro';
import styles from './Timer.module.scss';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimerHandle {
  getTime: () => Time;
}

const Timer = forwardRef<TimerHandle>((_, ref) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => {
      setTime(prevTime => {
        const newSeconds = prevTime.seconds + 1;
        const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
        const newHours = prevTime.hours + Math.floor(newMinutes / 60);
        return {
          hours: newHours,
          minutes: newMinutes % 60,
          seconds: newSeconds % 60
        };
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useImperativeHandle(ref, () => ({
    getTime: () => time
  }));
  return (
    <Space className={styles.Timer}>
      <span>{time.hours.toString().padStart(2, '0')}</span>:
      <span>{time.minutes.toString().padStart(2, '0')}</span>:
      <span>{time.seconds.toString().padStart(2, '0')}</span>
    </Space>
  );
});
export default Timer;