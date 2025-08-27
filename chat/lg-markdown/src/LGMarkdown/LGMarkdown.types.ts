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

/**
 * @remarks
 * This is a temporary type declaration because the type for `node` is not
 * exported in the package. We are blocked from upgrading to the latest version
 * of `react-markdown` due to react-markdown@9.0.0 requiring react 18+ which
 * consumers have not yet upgraded to. This should be more strictly typed if we
 * use the `node` prop in the future and still cannot upgrade to
 * react-markdown@9.0.0.
 */
export interface ExtraProps {
  node: any;
}
