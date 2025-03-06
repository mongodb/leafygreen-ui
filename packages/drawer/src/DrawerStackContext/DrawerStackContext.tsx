import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { DrawerStackContextType } from './DrawerStackContext.types';

export const DrawerStackContext = createContext<DrawerStackContextType | null>(
  null,
);

export const DrawerStackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stack, setStack] = useState<Array<string>>([]);

  const registerDrawer = useCallback(
    (id: string) => {
      if (stack.includes(id)) {
        return;
      }

      setStack(prev => [...prev, id]);
    },
    [setStack, stack],
  );

  const unregisterDrawer = useCallback(
    (id: string) => {
      setStack(prev => prev.filter(item => item !== id));
    },
    [setStack],
  );

  const getDrawerIndex = useCallback(
    (id: string) => {
      return stack.indexOf(id);
    },
    [stack],
  );

  const value = useMemo(
    () => ({ registerDrawer, unregisterDrawer, getDrawerIndex }),
    [registerDrawer, unregisterDrawer, getDrawerIndex],
  );

  return (
    <DrawerStackContext.Provider value={value}>
      {children}
    </DrawerStackContext.Provider>
  );
};

export const useDrawerStackContext = () => {
  const context = useContext(DrawerStackContext);

  if (!context) {
    throw new Error('useDrawerStack must be used within a DrawerStackProvider');
  }

  return context;
};
