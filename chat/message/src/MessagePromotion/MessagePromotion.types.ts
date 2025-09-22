import { LGMarkdownProps } from '@lg-chat/lg-markdown';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface MessagePromotionProps
  extends Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Promotion text content.
   */
  promotionText: string;

  /**
   * Promotion URL.
   */
  promotionUrl?: string;

  /**
   * Base font size.
   */
  baseFontSize?: BaseFontSize;

  /**
   * Promotion onClick callback handler
   */
  onPromotionClick?: () => void;

  /**
   * Props passed to the internal ReactMarkdown instance
   */
  markdownProps?: Omit<LGMarkdownProps, 'children'>;
}
