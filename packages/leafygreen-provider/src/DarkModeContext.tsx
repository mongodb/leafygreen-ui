import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

interface DarkModeContextProps {
  globalDarkMode: boolean;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  globalDarkMode: false,
});
export const useDarkModeContext = () => useContext(DarkModeContext);
export const useDefaultDarkMode = (componentDarkMode?: boolean) => {
  const { globalDarkMode } = useDarkModeContext();
  return componentDarkMode ?? globalDarkMode;
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
