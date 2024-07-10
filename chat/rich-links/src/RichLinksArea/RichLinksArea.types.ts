import { DarkModeProps } from '@leafygreen-ui/lib';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { type RichLinkProps } from '..';

export interface RichLinksAreaProps
  extends HTMLElementProps<'div', never>,
    DarkModeProps {
  links: Array<RichLinkProps>;
}
