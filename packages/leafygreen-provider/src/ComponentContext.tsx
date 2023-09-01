import React, { createContext, PropsWithChildren, useContext } from 'react';

type ComponentContextProps<T extends any> = PropsWithChildren<{
  contextComponent: string;
  componentProps?: T;
}>;

const ComponentContext = createContext<ComponentContextProps<any>>({
  contextComponent: '',
  componentProps: {},
});

export const useComponentContext = () => useContext(ComponentContext);

export const ComponentContextProvider = <T extends any>({
  contextComponent,
  componentProps,
  children,
}: ComponentContextProps<T>) => {
  return (
    <ComponentContext.Provider
      value={{
        contextComponent,
        componentProps,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};
