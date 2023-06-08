import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface SkeletonProps extends DarkModeProps, HTMLElementProps<'div'> {
  /**
   * Determines the height of the skeleton
   * @default "default"
   */
  size?: Size;
}

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];
