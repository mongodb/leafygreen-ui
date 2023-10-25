import React from 'react';

export interface BaseItemProps {
  /**
   * Content to appear inside of item
   */
  children?: React.ReactNode;

  /**
   * Prevents the option from being selectable.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the component is active, regardless of keyboard navigation
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
}
