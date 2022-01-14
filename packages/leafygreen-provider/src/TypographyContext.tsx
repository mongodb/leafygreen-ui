import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export interface TypographyProviderProps {
  children: React.ReactNode;
  baseFontSize?: 13 | 16;
}

const BaseFontSizeContext = createContext<13 | 16>(13);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function TypographyProvider({
  children,
  baseFontSize = 13,
}: TypographyProviderProps) {
  return (
    <BaseFontSizeContext.Provider value={baseFontSize}>
      {children}
    </BaseFontSizeContext.Provider>
  );
}

TypographyProvider.displayName = 'TypographyProvider';

TypographyProvider.propTypes = {
  children: PropTypes.node,
  baseFontSize: PropTypes.number,
};

export default TypographyProvider;
