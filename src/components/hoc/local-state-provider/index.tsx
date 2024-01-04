import { useLocalStorageState } from 'ahooks';
import React, { ReactNode, useContext } from 'react';

/**
 * 默认本地状态
 */
const DefaultState = {};

/**
 * 本地状态类型
 */
export type LocalState = Partial<typeof DefaultState>;

/**
 * 本地状态 Context
 */
const LocalStateContext = React.createContext<{
  /**
   * 本地状态
   */
  state: LocalState;

  /**
   * 设置本地状态某一项的值
   */
  set: <T extends keyof LocalState>(key: T, value?: LocalState[T]) => void;
}>({
  state: {},
  set: () => console.warn('Missing LocalStateContext.Provider')
});

export const LocalStateProvider = ({ children }: { children: ReactNode }) => {
  const [localState, setLocalState] = useLocalStorageState<LocalState>('local-state', { defaultValue: DefaultState });

  return (
    <LocalStateContext.Provider
      value={{
        state: localState || {},
        set: (key, value) =>
          setLocalState({
            ...localState,
            [key]: value
          })
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};

/**
 * 获取本地状态某一项的值
 * @param key 项的键
 * @returns 项的值，带默认的项的值，设置项的值的函数
 */
export const useLocalState = <T extends keyof LocalState>(key: T) => {
  const { state, set } = useContext(LocalStateContext);

  return [state[key], state[key] ?? DefaultState[key], (value?: LocalState[T]) => set(key, value)] as const;
};
