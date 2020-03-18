import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

interface BaseFontSizeProviderProps {
  children: React.ReactNode;
  baseFontSize: number;
}

const BaseFontSizeContext = createContext<number>(14);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function BaseFontSizeProvider({
  children,
  baseFontSize,
}: BaseFontSizeProviderProps) {
  return (
    <BaseFontSizeContext.Provider value={baseFontSize}>
      {children}
    </BaseFontSizeContext.Provider>
  );
}

BaseFontSizeProvider.displayName = 'BaseFontSizeProvider';

BaseFontSizeProvider.propTypes = {
  children: PropTypes.node,
  baseFontSize: PropTypes.number,
};

export default BaseFontSizeProvider;
