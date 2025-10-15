import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface AccordionProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps {
  /**
   * Required children which can be `AccordionItem` components
   */
  children: React.ReactNode;

  /**
   * Optional number that can be used along with `onIndexChange` to make controlled `Accordion`
   */
  index?: number;

  /**
   * Optional number that can be provided to determine which panel is expanded when component initially renders
   */
  defaultIndex?: number;

  /**
   * Optional callback that is fired when an accordion item is expanded.
   */
  onIndexChange?: React.Dispatch<React.SetStateAction<number>>;
}
