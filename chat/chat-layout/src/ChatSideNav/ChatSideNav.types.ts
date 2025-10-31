import { ComponentPropsWithRef, MouseEventHandler } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ChatSideNavProps
  extends ComponentPropsWithRef<'nav'>,
    DarkModeProps {}

export interface ChatSideNavHeaderProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps {
  /**
   * Optional callback fired when the "New Chat" button is clicked.
   */
  onClickNewChat?: MouseEventHandler<HTMLButtonElement>;
}

export interface ChatSideNavContentProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps {}

export interface ChatSideNavFooterProps extends ComponentPropsWithRef<'div'> {}

/**
 * Static property names used to identify ChatSideNav compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const ChatSideNavSubcomponentProperty = {
  Header: 'isChatSideNavHeader',
  Content: 'isChatSideNavContent',
  SideNavItem: 'isChatSideNavItem',
} as const;

/**
 * Type representing the possible static property names for ChatSideNav subcomponents.
 */
export type ChatSideNavSubcomponentProperty =
  (typeof ChatSideNavSubcomponentProperty)[keyof typeof ChatSideNavSubcomponentProperty];
