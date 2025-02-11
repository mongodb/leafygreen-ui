import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { ComponentPropsWithRef } from 'react';

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
