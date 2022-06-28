import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';
import { getTheme, ThemeType } from '@leafygreen-ui/lib';

interface DarkModeContextProps {
  globalDarkMode?: boolean;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  globalDarkMode: false,
});
export const useDarkModeContext = () => useContext(DarkModeContext);
export const useDarkMode: (componentDarkMode?: boolean) => {
  darkMode: boolean;
  theme: ThemeType;
} = componentDarkMode => {
  const { globalDarkMode } = useDarkModeContext();
  const darkMode = componentDarkMode ?? globalDarkMode ?? false;
  const theme = getTheme(darkMode);
  return { darkMode, theme };
};

function DarkModeProvider({
  children,
  globalDarkMode = false,
}: PropsWithChildren<DarkModeContextProps>) {
  return (
    <DarkModeContext.Provider
      value={{
        globalDarkMode,
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
