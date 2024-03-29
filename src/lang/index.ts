import en_US from './en_US';
import zh_CN from './zh_CN';

export type ILocales = 'zh-CN' | 'en-US';

export function getLocales(lang: ILocales) {
  switch (lang) {
    case 'zh-CN':
      return zh_CN;
    case 'en-US':
      return en_US;
    default:
      return zh_CN;
  }
}

export default {
  'zh-CN': zh_CN,
  'en-US': en_US
};
