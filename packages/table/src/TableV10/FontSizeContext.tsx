import React, { createContext, useContext } from 'react';

type BaseFontSize = 14 | 16;

/**
 * @deprecated
 */
interface FontSizeProviderInterface {
  baseFontSize: BaseFontSize;
  children: React.ReactNode;
}

const FontSizeContext = createContext<BaseFontSize>(14);

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
