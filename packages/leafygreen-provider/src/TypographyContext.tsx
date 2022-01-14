import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { consoleOnce } from '@leafygreen-ui/lib';

type FontSize = 13 | 14 | 16;
export interface TypographyProviderProps {
  children: React.ReactNode;
  baseFontSize?: FontSize;
}

const BaseFontSizeContext = createContext<FontSize>(13);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function TypographyProvider({
  children,
  baseFontSize = 13,
}: TypographyProviderProps) {
  if (baseFontSize === 14) {
    consoleOnce.warn(
      `Base font size 14 has been deprecated. Please update to 13.`,
    );
  }

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
