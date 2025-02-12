import { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface GalleryIndicatorProps
  extends Omit<ComponentPropsWithRef<'ul'>, 'onClick'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The total number of dots to render
   */
  count: number;

  /**
   * The index of the active dot`
   */
  activeIndex: number;
}
