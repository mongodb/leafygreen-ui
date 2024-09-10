import { ReactElement } from 'react';
import { type RichLinkProps } from '@lg-chat/rich-links';

import { type DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { type MessageContainerProps } from '../MessageContainer';
import { type MessageContentProps } from '../MessageContent';
import { type MessageLinksProps } from '../MessageLinks';

export const Align = {
  Right: 'right',
  Left: 'left',
} as const;

export type Align = (typeof Align)[keyof typeof Align];

export interface ComponentOverrides {
  MessageContainer?: (props: MessageContainerProps) => JSX.Element;
  MessageContent?: (props: MessageContentProps) => JSX.Element;
  MessageLinks?: (props: MessageLinksProps) => JSX.Element;
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

  /**
   * Configure a *verified message* which includes additional styles and
   * displays information about the message.
   */
  verified?: VerificationInfo;

  /**
   * A list of links to render as rich links for the message.
   */
  links?: Array<RichLinkProps>;

  /**
   * The heading text to display for the links section.
   */
  linksHeading?: string;
}

export interface VerificationInfo {
  /**
   * The name of the entity that verified the message.
   * @example "MongoDB Staff"
   */
  verifier?: string;

  /**
   * The time the message was last verified.
   * @example new Date("2024-03-24T16:20:00Z")
   */
  verifiedAt?: Date;

  /**
   * URL to learn more about the verification.
   */
  learnMoreUrl?: string;
}
