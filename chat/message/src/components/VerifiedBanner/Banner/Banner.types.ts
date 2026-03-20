import React from 'react';

import { Variant } from '@leafygreen-ui/banner';
import { DarkModeProps } from '@leafygreen-ui/lib';

export interface BannerProps
  extends React.ComponentPropsWithRef<'div'>,
    DarkModeProps {
  /**
   * Determines the color and glyph of the Banner.
   * @default Variant.Info
   */
  variant?: Variant;

  /**
   * The content inside of the Banner.
   */
  children: React.ReactNode;
}
