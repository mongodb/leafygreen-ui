import { ReactElement } from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { MessageContainerProps } from '../MessageContainer';
import { MessageContentProps } from '../MessageContent';

export const Align = {
  Right: 'right',
  Left: 'left',
} as const;

export type Align = (typeof Align)[keyof typeof Align];

export interface ComponentOverrides {
  MessageContainer?: (props: MessageContainerProps) => JSX.Element;
  MessageContent?: (props: MessageContentProps) => JSX.Element;
}

export interface MessageProps
  extends Omit<MessageContentProps, 'children'>,
    HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Indicates if the message is from the current user
   * @default true
   */
  isSender?: boolean;
  /**
   * Avatar element
   */
  avatar?: ReactElement;

  /**
   * Determines whether the message is aligned to the left or right
   *
   * By default, if `isSender === true`, the message is aligned to the right, and otherwise to the left. This prop overrides that behavior.
   */
  align?: Align;
  /**
   * Component overrides for any subcomponents
   */
  componentOverrides?: ComponentOverrides;
  /**
   * Base font size
   */
  baseFontSize?: BaseFontSize;

  /**
   * Message body text passed to LGMarkdown
   */
  messageBody?: string;
}
