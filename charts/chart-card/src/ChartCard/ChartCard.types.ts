import React, { MouseEventHandler } from 'react';

export const ChartCardStates = {
  Unset: 'unset',
  Dragging: 'dragging',
  Overlay: 'overlay',
} as const;
export type ChartCardStates =
  (typeof ChartCardStates)[keyof typeof ChartCardStates];

export interface ChartCardProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * The title of the card
   */
  title: React.ReactNode;

  /**
   * Defines the default state of the card
   */
  defaultOpen?: boolean;

  /**
   * Forces the card state
   */
  isOpen?: boolean;

  /**
   * Callback fired when user clicks the toggle button
   */
  onToggleButtonClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;

  /**
   * Controls the current chart card state.
   */
  state?: ChartCardStates;

  /**
   * Unique identifier when using with `DragProvider`.
   */
  dragId?: string;
}
