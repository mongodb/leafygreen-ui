import { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface GalleryIndicatorProps
  extends ComponentPropsWithRef<'ul'>,
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
}
