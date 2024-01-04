import React, { useContext } from 'react';

type GlobalStateProps = {
  selectedTab?: number;
  setSelectedTab?: React.Dispatch<React.SetStateAction<number>>;
};

export const GlobalStateContext = React.createContext<GlobalStateProps>({});

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
