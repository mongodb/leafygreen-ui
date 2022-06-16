import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';
import { DarkModeProps, Mode } from '@leafygreen-ui/lib';
import type { ModeType } from 'packages/lib/src/DarkModeProps';

type DarkModeContextProps = DarkModeProps & {
  theme?: ModeType;
};

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  theme: Mode.Light,
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
        theme: darkMode ? Mode.Dark : Mode.Light,
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
