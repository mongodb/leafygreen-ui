import ReactMarkdown from 'react-markdown';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

type ReactMarkdownProps = Parameters<typeof ReactMarkdown>[0];

export interface LGMarkdownProps extends ReactMarkdownProps, DarkModeProps {
  baseFontSize?: BaseFontSize;
}

export type MarkdownCodeProps = HTMLElementProps<'code'> & {
  inline?: boolean;
};
