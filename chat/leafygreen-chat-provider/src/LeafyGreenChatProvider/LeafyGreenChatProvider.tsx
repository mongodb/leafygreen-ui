import React, { createContext, useContext } from 'react';

import {
  LeafyGreenChatContextProps,
  LeafyGreenChatProviderProps,
} from './LeafyGreenChatProvider.types';

const DEFAULT_ASSISTANT_NAME = 'MongoDB Assistant';

const LeafyGreenChatContext = createContext<LeafyGreenChatContextProps>({
  assistantName: DEFAULT_ASSISTANT_NAME,
});
export const useLeafyGreenChatContext = () => useContext(LeafyGreenChatContext);

export function LeafyGreenChatProvider({
  assistantName = DEFAULT_ASSISTANT_NAME,
  children,
}: LeafyGreenChatProviderProps) {
  return (
    <LeafyGreenChatContext.Provider
      value={{
        assistantName,
      }}
    >
      {children}
    </LeafyGreenChatContext.Provider>
  );
}

LeafyGreenChatProvider.displayName = 'LeafyGreenChatProvider';
