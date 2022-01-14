import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export interface TypographyProviderProps {
  children: React.ReactNode;
  baseFontSize?: 14 | 16;
}

const BaseFontSizeContext = createContext<14 | 16>(14);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function TypographyProvider({
  children,
  baseFontSize = 14,
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
