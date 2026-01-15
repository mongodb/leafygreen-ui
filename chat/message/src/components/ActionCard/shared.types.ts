import { ReactNode } from 'react';

import { ChipProps } from '@leafygreen-ui/chip';

/**
 * State enum for interaction lifecycle states
 */
export const State = {
  Canceled: 'canceled',
  Error: 'error',
  Idle: 'idle',
  Running: 'running',
  Success: 'success',
} as const;
export type State = (typeof State)[keyof typeof State];

export interface ActionCardStateProps {
  /**
   * The current lifecycle state of the interaction.
   */
  state: State;
}

/**
 * Static property names used to identify ActionCard compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const ActionCardSubcomponentProperty = {
  Actions: 'isLGActionCardActions',
  Button: 'isLGActionCardButton',
  ExpandableContent: 'isLGActionCardExpandableContent',
} as const;

/**
 * Type representing the possible static property names for ActionCard subcomponents.
 */
export type ActionCardSubcomponentProperty =
  (typeof ActionCardSubcomponentProperty)[keyof typeof ActionCardSubcomponentProperty];

/**
 * Metadata chip with glyph and label
 */
export type ActionCardChipProps = Pick<
  ChipProps,
  'formatTooltip' | 'glyph' | 'label'
>;

export interface SharedActionCardProps extends ActionCardStateProps {
  /**
   * Metadata chips (glyph and label) displayed in the Header.
   * @default []
   */
  chips?: Array<ActionCardChipProps>;

  /**
   * Whether the toggle button is visible.
   * @default true
   */
  showExpandButton?: boolean;

  /**
   * Primary label displayed in the Header.
   */
  title: ReactNode;
}
