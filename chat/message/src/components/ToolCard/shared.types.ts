import { ReactNode } from 'react';

import { ChipProps } from '@leafygreen-ui/chip';

/**
 * State enum for tool interaction lifecycle states
 */
export const State = {
  Canceled: 'canceled',
  Error: 'error',
  Idle: 'idle',
  Running: 'running',
  Success: 'success',
} as const;
export type State = (typeof State)[keyof typeof State];

export interface ToolCardStateProps {
  /**
   * The current lifecycle state of the tool interaction.
   */
  state: State;
}

/**
 * Static property names used to identify ToolCard compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const ToolCardSubcomponentProperty = {
  Actions: 'isLGToolCardActions',
  ExpandableContent: 'isLGToolCardExpandableContent',
} as const;

/**
 * Type representing the possible static property names for ToolCard subcomponents.
 */
export type ToolCardSubcomponentProperty =
  (typeof ToolCardSubcomponentProperty)[keyof typeof ToolCardSubcomponentProperty];

/**
 * Metadata chip with glyph and label
 */
export type ToolCardChipProps = Pick<
  ChipProps,
  'formatTooltip' | 'glyph' | 'label'
>;

export interface SharedToolCardProps extends ToolCardStateProps {
  /**
   * Metadata chips (glyph and label) displayed in the Header.
   * @default []
   */
  chips?: Array<ToolCardChipProps>;

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
