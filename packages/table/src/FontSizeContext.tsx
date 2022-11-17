import React, { createContext, useContext } from 'react';

type BaseFontSize = 13 | 16;

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
