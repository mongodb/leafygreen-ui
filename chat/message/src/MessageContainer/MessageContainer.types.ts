import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export const Variant = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];
export interface MessageContainerProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Determines the styles of the message container
   * @default Variant.Primary
   */
  variant?: Variant;
}
