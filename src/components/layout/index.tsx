import { useLoad } from '@tarojs/taro';
import WithGlobalState from '../hoc/with-global-state';
import WithIntl from '../hoc/with-intl';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  useLoad(() => {
    console.log('CustomLayout');
  });

  return (
    <WithGlobalState>
      <WithIntl>{children}</WithIntl>
    </WithGlobalState>
  );
};

export default CustomLayout;
