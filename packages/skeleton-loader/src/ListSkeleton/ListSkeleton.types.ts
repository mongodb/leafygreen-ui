import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface ListSkeletonProps
  extends DarkModeProps,
    HTMLElementProps<'ul'> {
  count?: number;
  bulletsOnly?: boolean;
}
