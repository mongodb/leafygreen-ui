import { LGMarkdownProps } from '@lg-chat/lg-markdown';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { type MessageSourceType } from "../MessageContent"

export interface MessagePromotionProps extends Omit<HTMLElementProps<'div'>, 'children'> {
  /**
   * Promotion text content.
   */
  promotionText: string;

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
   * @returns void
   */
  onPromotionClick?: () => void;  // TODO - figure out inps
  
  /**
   * Props passed to the internal ReactMarkdown instance
   */
  markdownProps?: Omit<LGMarkdownProps, 'children'>;
}