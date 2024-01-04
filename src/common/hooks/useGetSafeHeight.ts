import Taro from '@tarojs/taro';

const TAB_BAR_HEIGHT = 86;

/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度，需二次计算
 * @param {*} showTabBar
 */
export function useGetSafeHeight(showTabBar: boolean = true) {
  const info = Taro.getSystemInfoSync();
  const { windowHeight } = info;
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0;

  return windowHeight - tabBarHeight;
}

export default useGetSafeHeight;
