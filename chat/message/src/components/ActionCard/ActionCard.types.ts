import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedActionCardProps } from './shared.types';

export interface ActionCardProps
  extends Omit<ComponentPropsWithRef<'div'>, 'title'>,
    DarkModeProps,
    SharedActionCardProps {
  /**
   * Initial state of the expandable section.
   * @default false
   * @remarks This prop is ignored when `showExpandButton` is `false`
   * to prevent an expanded state with no way to collapse.
   */
  initialIsExpanded?: boolean;

  /**
   * Callback fired when the expansion toggle is clicked.
   * @remarks This callback receives the new open state as a parameter.
   */
  onToggleExpanded?: (isOpen: boolean) => void;
}
