import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

export type ContentStyle = (typeof ContentStyle)[keyof typeof ContentStyle];

export interface CardProps extends DarkModeProps, HTMLElementProps<'div'> {
  /**
   * Determines whether the Card should be styled as clickable.
   *
   * Defaults to `'clickable'` (when a valid `onClick` handler or `href` link is provided
   *
   * @default 'clickable' | 'none'
   */
  contentStyle?: ContentStyle;
}
