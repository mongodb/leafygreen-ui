import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface SkeletonProps extends DarkModeProps, HTMLElementProps<'div'> {
  /**
   * Determines the height of the skeleton
   * @default Size.Default
   */
  size?: Size;
}

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
};

export type Size = typeof Size[keyof typeof Size];
