import React from 'react';

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export interface CopyableProps extends React.ComponentProps<'div'> {
  /**
   * Determines whether or not the component appears in dark theme.
   * @default false
   */
  darkMode?: boolean;

  /**
   * Label text
   */
  label?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * If `true`, there will be a copy button that will move the component's children to the user's clipboard
   */
  copyable?: boolean;

  /**
   * Styles applied to the outer most div of the component
   */
  wrapperClassName?: string;

  /**
   * The display size of the label, description, and copyable children
   */

  size?: Size;

  children: string;
}
