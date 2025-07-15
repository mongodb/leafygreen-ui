import React, { createContext, useContext, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

import {
  LeafyGreenChatContextProps,
  LeafyGreenChatProviderProps,
  Variant,
} from './LeafyGreenChatProvider.types';

const LeafyGreenChatContext = createContext<LeafyGreenChatContextProps>({
  containerWidth: undefined,
  variant: Variant.Spacious,
});
export const useLeafyGreenChatContext = () => useContext(LeafyGreenChatContext);

export function LeafyGreenChatProvider({
  children,
  variant = Variant.Spacious,
}: LeafyGreenChatProviderProps) {
  const [containerWidth, setContainerWidth] = useState<number>();

  const { ref: resizeRef } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width }) => {
      setContainerWidth(width);
    },
  });

  return (
    <LeafyGreenChatContext.Provider
      value={{
        containerWidth,
        variant,
      }}
    >
      <div style={{ width: '100%' }} ref={resizeRef}>
        {children}
      </div>
    </LeafyGreenChatContext.Provider>
  );
}

LeafyGreenChatProvider.displayName = 'LeafyGreenChatProvider';
