import en_US from '@/lang/en_US';
import zh_CN from '@/lang/zh_CN';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import en from '@nutui/nutui-react-taro/dist/locales/en-US';
import zh from '@nutui/nutui-react-taro/dist/locales/zh-CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
// 按需加载插件
import Taro from '@tarojs/taro';
import calenderPlugin from 'dayjs/plugin/calendar';
import localData from 'dayjs/plugin/localeData';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import WithLang from '../with-lang';
import { LANG_EN_US, LANG_ZH_CN, LangType } from '../with-lang/define';

dayjs.extend(LocalizedFormat);
dayjs.extend(calenderPlugin);
dayjs.extend(localData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

interface WithIntlProps {
  children: React.ReactNode;
}

const WithIntl = ({ children }: WithIntlProps) => {
  const [lang, setLang] = useState<LangType>(LANG_ZH_CN);

  // 获取微信设置的语言
  const storageLang = Taro.getStorageSync('lang');
  const info = Taro.getSystemInfoSync();
  const systemLanguage = info.language === 'zh_CN' ? LANG_ZH_CN : LANG_EN_US;

  useEffect(() => {
    setLang((storageLang || systemLanguage) === LANG_ZH_CN ? LANG_ZH_CN : LANG_EN_US);
  }, []);

  useEffect(() => {
    dayjs.locale(lang === LANG_ZH_CN ? 'zh-cn' : 'en');
  }, [lang]);

  return (
    <IntlProvider messages={lang === LANG_ZH_CN ? zh_CN : en_US} locale={lang} defaultLocale={LANG_ZH_CN}>
      <ConfigProvider locale={lang === LANG_ZH_CN ? zh : en}>
        <WithLang lang={lang} setLang={setLang}>
          {children}
        </WithLang>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default WithIntl;
