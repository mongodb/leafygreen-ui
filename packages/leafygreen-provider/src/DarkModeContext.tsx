import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';
import { Theme } from '@leafygreen-ui/lib';
import type { ThemeType } from 'packages/lib/src/DarkModeProps';

interface DarkModeContextProps {
  globalDarkMode: boolean;
  theme?: ThemeType;
  getTheme: (darkMode: boolean) => ThemeType;
}

const getTheme = (darkMode: boolean) => (darkMode ? Theme.Dark : Theme.Light);

const DarkModeContext = createContext<DarkModeContextProps>({
  globalDarkMode: false,
  theme: Theme.Light,
  getTheme,
});
export const useDarkModeContext = () => useContext(DarkModeContext);

function DarkModeProvider({
  children,
  globalDarkMode = false,
}: PropsWithChildren<DarkModeContextProps>) {
  return (
    <DarkModeContext.Provider
      value={{
        globalDarkMode,
        theme: getTheme(globalDarkMode),
        getTheme,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.displayName = 'DarkModeProvider';

DarkModeProvider.propTypes = {
  children: PropTypes.node,
  globalDarkMode: PropTypes.bool,
};

export default DarkModeProvider;
