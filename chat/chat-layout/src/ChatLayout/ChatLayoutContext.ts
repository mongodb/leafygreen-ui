import { createContext, useContext } from 'react';

export interface ChatLayoutContextProps {
  /**
   * Whether the side nav is pinned (expanded) or not
   */
  isPinned: boolean;

  /**
   * Function to toggle the pinned state of the side nav
   */
  togglePin: () => void;
}

export const ChatLayoutContext = createContext<ChatLayoutContextProps>({
  isPinned: true,
  togglePin: () => {},
});

export const useChatLayoutContext = () => useContext(ChatLayoutContext);
