import { useLoad } from '@tarojs/taro';
import { WithAuth } from '../hoc/with-auth';
import WithGlobalState from '../hoc/with-global-state';
import WithIntl from '../hoc/with-intl';

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  useLoad(() => {
    console.log('CustomLayout');
  });

  return (
    <WithAuth>
      <WithGlobalState>
        <WithIntl>{children}</WithIntl>
      </WithGlobalState>
    </WithAuth>
  );
};

export default CustomLayout;
