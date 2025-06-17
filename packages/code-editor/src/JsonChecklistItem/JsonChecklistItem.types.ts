import { ReactNode } from 'react';

import type { BadgeProps } from '@leafygreen-ui/badge';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Options to control the status of the checklist item
 * @param Missing - Indicates the item is not yet added
 * @param Present - Indicates the item has been added
 */
export const Status = {
  Missing: 'missing',
  Present: 'present',
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export interface JsonChecklistItemProps
  extends DarkModeProps,
    HTMLElementProps<'li'> {
  /**
   * Badge(s) rendered alongside the label
   */
  badges?: BadgeProps | Array<BadgeProps>;

  /**
   * Additional description for the item
   */
  description?: ReactNode;

  /**
   * Label for the item
   */
  label: ReactNode;

  /**
   * Callback invoked when clicking “Add” button. This is only visible when
   * `status` is `'missing'`.
   */
  onAddClick: () => void;

  /**
   * Determines rendering of the status UI:
   * - `'missing'` will render "Add" button to add missing item
   * - `'present'` will render checkmark icon with “Added!” text
   */
  status: Status;
}
