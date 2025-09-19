import { LGMarkdownProps } from '@lg-chat/lg-markdown';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { type MessageSourceType } from '../MessageContent';

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
   * Promotion text content rendering method.
   * @default MessageSourceType.Markdown
   */
  promotionContentType?: MessageSourceType;

  /**
   * Promotion onClick callback handler
   */
  onPromotionClick?: () => void;

  /**
   * Props passed to the internal ReactMarkdown instance
   */
  markdownProps?: Omit<LGMarkdownProps, 'children'>;
}
