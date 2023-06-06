import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface ParagraphSkeletonProps
  extends DarkModeProps,
    HTMLElementProps<'div'> {
  /**
   * Determines whether the header skeleton should be rendered
   */
  withHeader?: boolean;
}
