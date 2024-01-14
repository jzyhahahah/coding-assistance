import { Address, AddressProps, Space } from '@nutui/nutui-react-taro';
import { CascaderOption } from '@nutui/nutui-react-taro/dist/types/packages/cascader/types';
import { useState } from 'react';

type MyAddressIProps = Partial<Omit<AddressProps, 'value' | 'onChange'>> & {
  visible: boolean;
  options: CascaderOption[];
  onClose: () => void;
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
};

const MyAddress = ({ visible, options, onClose, value, onChange, ...props }: MyAddressIProps) => {
  const [address, setAddress] = useState<(string | number)[]>();
  return (
    <>
      <Address
        visible={visible}
        //defaultValue={value2}
        options={options}
        optionKey={{
          textKey: 'text',
          valueKey: 'value',
          childrenKey: 'children'
        }}
        value={value}
        onChange={(val) => {
          setAddress(val);
          onChange?.(val);
        }}
        onClose={onClose}
      />
      <Space>
        {value?.[0] === '' && '请选择地址'}
        {value?.map((item) => {
          return <>{item}</>;
        })}
      </Space>
    </>
  );
};

export default MyAddress;
