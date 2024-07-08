import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from 'use-resize-observer';

import { LeafyGreenChatContextProps } from './LeafyGreenChatProvider.types';
import { LeafyGreenChatProviderProps } from '.';

const LeafyGreenChatContext = createContext<LeafyGreenChatContextProps>({
  containerWidth: undefined,
});
export const useLeafyGreenChatContext = () => useContext(LeafyGreenChatContext);

export function LeafyGreenChatProvider({
  children,
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
      }}
    >
      <div style={{ width: '100%' }} ref={resizeRef}>
        {children}
      </div>
    </LeafyGreenChatContext.Provider>
  );
}

LeafyGreenChatProvider.displayName = 'LeafyGreenChatProvider';

LeafyGreenChatProvider.propTypes = {
  children: PropTypes.node,
};
