import { useGlobalState } from '@/components/hoc/with-global-state/define';
import { useLang } from '@/components/hoc/with-lang/define';
import { Category, Find, Home, My } from '@nutui/icons-react-taro';
import { Tabbar } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const CustomTabBar = () => {
  const { format: t } = useLang();
  // icon 用 size 属性，因为都是字体图标，设置的是 fontSize
  // 官网用的是width height，如果使用width height会导致icon的宽高异常
  const tabs = [
    {
      path: '/pages/home/index',
      title: t('Home'),
      icon: <Home size={18} />
    },
    {
      path: '/pages/course/index',
      title: t('Course'),
      icon: <Category size={18} />,
      value: 1
    },
    {
      path: '/pages/activity/index',
      title: t('Activity'),
      icon: <Find size={18} />
    },
    {
      path: '/pages/account/index',
      title: t('Account'),
      icon: <My size={18} />
    }
  ];

  const { selectedTab, setSelectedTab } = useGlobalState();
  const onSwitch = (index: number) => {
    setSelectedTab?.(index);
    Taro.switchTab({
      url: tabs[index].path
    });
  };

  return (
    <Tabbar value={selectedTab} onSwitch={onSwitch} safeArea inactiveColor="#7d7e80" activeColor="#1989fa">
      {tabs.map((v) => (
        <Tabbar.Item key={v.path} title={v.title} icon={v.icon} value={v?.value} />
      ))}
    </Tabbar>
  );
};

// Taro 下自定义 tabBar 默认存在样式隔离，无法引用到全局样式，需要手动配置
// https://github.com/jdf2e/nutui/issues/2138
CustomTabBar.options = {
  addGlobalClass: true
};

export default CustomTabBar;
