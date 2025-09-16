import React, { ChangeEventHandler, ReactElement } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface ContextDrawerProps
  extends DarkModeProps,
    LgIdProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'content'> {
  /**
   * The content to be displayed within the drawer.
   */
  content: ReactElement;

  /**
   * The default open state of the drawer when it is uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * The maximum height of the content area when expanded. Can be a number (in pixels)
   * or a string (e.g., '50%').
   * @default 160
   */
  expandedHeight?: number | string;

  /**
   * The open state of the drawer. Providing this prop will switch the
   * component to controlled mode.
   */
  isOpen?: boolean;

  /**
   * Event handler called when the open state of the drawer changes.
   */
  onOpenChange?: ChangeEventHandler<boolean>;

  /**
   * The element that the drawer is positioned relative to.
   */
  reference: ReactElement;

  /**
   * The element that triggers the opening and closing of the drawer.
   * Can be a React element or a function that receives the `isOpen` state.
   */
  trigger: ReactElement | ((props: { isOpen: boolean }) => ReactElement);
}
