import { DarkModeProps } from '@leafygreen-ui/lib';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { type RichLinkProps } from '..';

export interface RichLinksAreaProps
  extends Omit<HTMLElementProps<'div'>, 'children'>,
    DarkModeProps {
  links: Array<RichLinkProps>;

  /**
   * A callback function that is called when any link is clicked.
   */
  onLinkClick?: RichLinkProps['onLinkClick'];
}
