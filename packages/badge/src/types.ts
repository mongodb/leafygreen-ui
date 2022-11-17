import { HTMLElementProps } from "@leafygreen-ui/lib";

interface BadgeProps extends HTMLElementProps<'div'> {
  /**
   * An additional className to add to the component's classList
   */
  className?: string;

  /**
   * The content to render within the badge
   */
  children?: React.ReactNode;

  /**
   * The Badge's style variant
   *
   * @default 'lightgray'
   */
  variant?: Variant;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   * @default false
   */
  darkMode?: boolean;
}

export const Variant = {
  DarkGray: 'darkgray',
  LightGray: 'lightgray',
  Red: 'red',
  Yellow: 'yellow',
  Blue: 'blue',
  Green: 'green',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export default BadgeProps;