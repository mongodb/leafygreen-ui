import { Options as ReactMarkdownOptions } from 'react-markdown';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface LGMarkdownProps extends DarkModeProps, ReactMarkdownOptions {
  baseFontSize?: BaseFontSize;

  /**
   * CSS class name to apply to the wrapper element
   */
  className?: string;
}
