import { LGMarkdownProps } from '@lg-chat/lg-markdown';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface MessagePromotionProps extends Omit<HTMLElementProps<'div'>, 'children'> {
  promotionText?: string;
  baseFontSize: BaseFontSize;
  onLinkClick: () => void;  // TODO - figure out inps
  markdownProps?: Omit<LGMarkdownProps, 'children'>;
}