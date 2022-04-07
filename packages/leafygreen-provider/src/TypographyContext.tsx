import React, { createContext, useContext } from 'react';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import PropTypes from 'prop-types';

export interface TypographyProviderProps {
  children: React.ReactNode;
  baseFontSize?: BaseFontSize;
}

const BaseFontSizeContext = createContext<BaseFontSize>(BaseFontSize.Body1);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function TypographyProvider({
  children,
  baseFontSize = BaseFontSize.Body1,
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
