import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

// TODO: Refresh - update to 13 | 16
type FontSize = 14 | 16;
export interface TypographyProviderProps {
  /**
   * The base font size of all LeafyGreen components unless overridden.
   */
  baseFontSize?: FontSize;
}

const BaseFontSizeContext = createContext<FontSize>(14);

export function useBaseFontSize() {
  return useContext(BaseFontSizeContext);
}

function TypographyProvider({
  children,
  baseFontSize = 14,
}: PropsWithChildren<TypographyProviderProps>) {
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
