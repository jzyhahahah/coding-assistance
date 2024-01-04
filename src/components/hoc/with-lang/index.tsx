import en_US from '@/lang/en_US';
import zh_CN from '@/lang/zh_CN';
import Taro from '@tarojs/taro';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { LANG_EN_US, LANG_ZH_CN, LangContext, LangKey, LangType, WithLangProps } from './define';

const WithLang = ({ lang, setLang, children }: WithLangProps) => {
  const intl = useIntl();
  const format = useCallback(<T extends LangKey>(id: T) => intl.formatMessage({ id }) as (typeof zh_CN | typeof en_US)[T], [intl]);
  const toggle = useCallback(() => {
    const newLang: LangType = lang === LANG_ZH_CN ? LANG_EN_US : LANG_ZH_CN;
    Taro.setStorageSync('lang', newLang);
    setLang(newLang);
  }, [lang, setLang]);

  return (
    <LangContext.Provider
      value={{
        lang,
        toggle,
        format
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default WithLang;
