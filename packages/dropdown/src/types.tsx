import React from 'react';

import { ActionType } from '@leafygreen-ui/input-option';

export interface BaseItemProps {
  /**
   * Content to appear inside of item
   */
  children?: React.ReactNode;

  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Determines whether or not the item is active.
   */
  active?: boolean;

  /**
   * Optional description text
   */
  description?: React.ReactNode;

  /**
   * Glyph to be displayed to the left of content
   */
  leftGlyph?: React.ReactNode;

  /**
   * Glyph to be displayed to the right of content
   */
  rightGlyph?: React.ReactNode;

  /**
   * Callback fired when item is clicked
   */
  onClick?: React.MouseEventHandler;

  /**
   * Styles input based on intended action
   * @default: 'default'
   */
  actionType?: ActionType;
}
