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

  /**
   * Whether the side nav is currently being hovered
   */
  isSideNavHovered: boolean;

  /**
   * Function to set the hover state of the side nav
   */
  setIsSideNavHovered: (isHovered: boolean) => void;

  /**
   * Whether the side nav should render in expanded state.
   * This is true when the nav is pinned OR when it's being hovered.
   */
  shouldRenderExpanded: boolean;
}

export const ChatLayoutContext = createContext<ChatLayoutContextProps>({
  isPinned: true,
  togglePin: () => {},
  isSideNavHovered: false,
  setIsSideNavHovered: () => {},
  shouldRenderExpanded: true,
});

export const useChatLayoutContext = () => useContext(ChatLayoutContext);
