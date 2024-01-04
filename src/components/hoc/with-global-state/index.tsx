import { useState } from 'react';
import { GlobalStateContext } from './define';

const WithGlobalState = ({ children }: { children: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return <GlobalStateContext.Provider value={{ selectedTab, setSelectedTab }}>{children}</GlobalStateContext.Provider>;
};

export default WithGlobalState;
