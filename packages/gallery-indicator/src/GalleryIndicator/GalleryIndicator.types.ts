import { ComponentPropsWithoutRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface GalleryIndicatorProps
  extends ComponentPropsWithoutRef<'ul'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The total number of dots to render
   */
  length: number;

  /**
   * The index of the active dot`
   */
  activeIndex: number;

  /**
   * The GalleryIndicator's style variant
   *
   * @default 'default'
   */
  variant?: Variant;
}

export const Variant = {
  Default: 'default',
  BaseGreen: 'baseGreen',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];
