import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

import { getTheme, Theme } from '@leafygreen-ui/lib';

interface DarkModeContextProps {
  contextDarkMode?: boolean;
  setDarkMode: React.Dispatch<boolean>;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  contextDarkMode: false,
  setDarkMode: () => {},
});
export const useDarkModeContext = () => useContext(DarkModeContext);

type useDarkMode = (localDarkMode?: boolean) => {
  darkMode: boolean;
  theme: Theme;
  setDarkMode: React.Dispatch<boolean>;
};

export const useDarkMode: useDarkMode = localDarkMode => {
  const { contextDarkMode, setDarkMode } = useDarkModeContext();
  const darkMode = localDarkMode ?? contextDarkMode ?? false;
  const theme = getTheme(darkMode);
  return { darkMode, theme, setDarkMode };
};

function DarkModeProvider({
  children,
  contextDarkMode,
  setDarkMode,
}: PropsWithChildren<DarkModeContextProps>) {
  return (
    <DarkModeContext.Provider
      value={{
        contextDarkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.displayName = 'DarkModeProvider';

DarkModeProvider.propTypes = {
  children: PropTypes.node,
  contextDarkMode: PropTypes.bool,
};

export default DarkModeProvider;
