import React, { createContext, useContext } from 'react';

/**
 * @deprecated
 */
interface DarkModeProviderInterface {
  darkMode: boolean;
  children: React.ReactNode;
}

const DarkModeContext = createContext<boolean>(false);

export function DarkModeProvider({
  children,
  darkMode,
}: DarkModeProviderInterface) {
  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}
