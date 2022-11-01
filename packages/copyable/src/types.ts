import { HTMLElementProps } from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface CopyableProps extends HTMLElementProps<'div'> {
  /**
   * Determines whether or not the component appears in dark theme.
   * @default false
   */
  darkMode?: boolean;
  children: string;
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
   * The display size of the label, description, and copyable children
   */
  size?: Size;
  /**
   * If `true`, the tooltip rendered as feedback when the user clicks the copy button will be rendered using a portal
   */
  shouldTooltipUsePortal?: boolean;
}