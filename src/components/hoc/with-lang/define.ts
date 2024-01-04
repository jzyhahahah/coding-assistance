import en_US from '@/lang/en_US';
import zh_CN from '@/lang/zh_CN';
import React, { useContext } from 'react';

export type LangType = 'zh' | 'en';
export const LANG_ZH_CN: LangType = 'zh';
export const LANG_EN_US: LangType = 'en';
export type LangKey = keyof typeof zh_CN & keyof typeof en_US;

// format 定义

export type LangInfo = {
  lang: LangType;
  toggle: () => void;
  format: <T extends LangKey>(id: T) => (typeof zh_CN | typeof en_US)[T];
};

export interface WithLangProps {
  lang: LangType;
  setLang: (lang: LangType) => void;
  children: React.ReactNode;
}

const showWarning = () => {
  console.warn('LangContext has not been provided. You are calling a noop function.');
};

export const LangContext = React.createContext<LangInfo>({
  lang: LANG_ZH_CN,
  toggle: showWarning,
  format: (id) => {
    showWarning();
    return zh_CN[id];
  }
});

export const useLang = () => {
  return useContext(LangContext);
};
