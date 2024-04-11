import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface SharedSkeletonProps {
  /**
   * Defines whether the loading "shimmer" animation renders
   *
   * @default true
   */
  enableAnimations?: boolean;
}

export interface SkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    HTMLElementProps<'div'> {
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

export type Size = (typeof Size)[keyof typeof Size];
