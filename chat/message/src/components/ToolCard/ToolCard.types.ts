import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedToolCardProps } from './shared.types';

export interface ToolCardProps
  extends Omit<ComponentPropsWithRef<'div'>, 'title'>,
    DarkModeProps,
    SharedToolCardProps {
  /**
   * Initial state of the expandable section.
   * @default false
   */
  initialIsExpanded?: boolean;

  /**
   * Callback fired when the expansion toggle is clicked.
   * @remarks This callback receives the new open state as a parameter.
   */
  onToggleExpanded?: (isOpen: boolean) => void;
}
