import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

import { MessagePromptsContextProps } from './MessagePromptsContext.types';

const MessagePromptsContext = createContext<MessagePromptsContextProps>({
  hasSelectedPrompt: false,
});
export const useMessagePromptsContext = () => useContext(MessagePromptsContext);

export function MessagePromptsProvider({
  hasSelectedPrompt,
  children,
}: PropsWithChildren<MessagePromptsContextProps>) {
  return (
    <MessagePromptsContext.Provider
      value={{
        hasSelectedPrompt,
      }}
    >
      {children}
    </MessagePromptsContext.Provider>
  );
}

MessagePromptsProvider.displayName = 'MessagePromptsProvider';

MessagePromptsProvider.propTypes = {
  children: PropTypes.node,
};
