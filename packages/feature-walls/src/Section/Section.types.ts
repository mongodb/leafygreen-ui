import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface SectionProps
  extends ComponentPropsWithRef<'section'>,
    DarkModeProps {
  /**
   * Optional boolean to render section in a Card UI
   */
  renderInCard?: boolean;

  /**
   * Required title text
   */
  title: string;
}
