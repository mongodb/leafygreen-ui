import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// TODO: Refresh - update to 13 | 16
type FontSize = 14 | 16;
export interface TypographyProviderProps {
  children: React.ReactNode;
  baseFontSize?: FontSize;
}

const BaseFontSizeContext = createContext<FontSize>(14);

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