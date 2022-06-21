import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';
import { DarkModeProps, Theme } from '@leafygreen-ui/lib';
import type { ThemeType } from 'packages/lib/src/DarkModeProps';

type DarkModeContextProps = DarkModeProps & {
  theme?: ThemeType;
};

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  theme: Theme.Light,
});
export const useDarkModeContext = () => useContext(DarkModeContext);

function DarkModeProvider({
  children,
  darkMode = false,
}: PropsWithChildren<DarkModeProps>) {
  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        theme: darkMode ? Theme.Dark : Theme.Light,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.displayName = 'DarkModeProvider';

DarkModeProvider.propTypes = {
  children: PropTypes.node,
  darkMode: PropTypes.bool,
};

export default DarkModeProvider;
