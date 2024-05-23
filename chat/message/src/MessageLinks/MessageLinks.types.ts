import { type RichLinkProps } from '@lg-chat/rich-links';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface MessageLinksProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * The text to display as the heading of the links section.
   */
  headingText?: string;

  /**
   * An list of link data to render in the links section.
   */
  links: Array<RichLinkProps>;
}
