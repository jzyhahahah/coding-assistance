import CustomLayout from '@/components/layout';
import { useDidHide, useDidShow } from '@tarojs/taro';
import axios from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';
import { ReactElement, createElement, useEffect } from 'react';
import './app.scss';

axios.defaults.adapter = mpAdapter as any;

function App(props: { children: ReactElement }) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return createElement(CustomLayout, null, props.children);
}

export default App;
