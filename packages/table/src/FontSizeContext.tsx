import React, { createContext, useContext } from 'react';
import { BaseFontSize } from '@leafygreen-ui/leafygreen-provider';

interface FontSizeProviderInterface {
  baseFontSize: BaseFontSize;
  children: React.ReactNode;
}

const FontSizeContext = createContext<BaseFontSize>(13);

export function FontSizeProvider({
  children,
  baseFontSize,
}: FontSizeProviderInterface) {
  return (
    <FontSizeContext.Provider value={baseFontSize}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSizeContext() {
  return useContext(FontSizeContext);
}
