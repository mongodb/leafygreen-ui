import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { type RichLinkProps } from '..';

export interface RichLinksAreaProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    DarkModeProps {
  links: Array<RichLinkProps>;

  /**
   * A callback function that is called when any link is clicked.
   */
  onLinkClick?: RichLinkProps['onLinkClick'];
}
