import React, { ForwardRefExoticComponent } from 'react';

import { type DarkModeProps } from '@leafygreen-ui/lib';

import { type MessageActionsProps } from '../MessageActions';
import { type MessageVerifiedBannerProps } from '../MessageBanner';
import { type MessageContentProps } from '../MessageContent';
import { type MessageLinksProps } from '../MessageLinks';
import { type MessagePromotionProps } from '../MessagePromotion';

export interface MessageProps
  extends Omit<MessageContentProps, 'children'>,
    DarkModeProps {
  /**
   * Component children
   */
  children?: React.ReactNode;

  /**
   * Indicates if the message is from the current user
   * @default true
   */
  isSender?: boolean;

  /**
   * Message body text passed to LGMarkdown
   */
  messageBody?: string;
}

/**
 * Static property names used to identify Message compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const MessageSubcomponentProperty = {
  Actions: 'isLGMessageActions',
  VerifiedBanner: 'isLGMessageVerifiedBanner',
  Links: 'isLGMessageLinks',
  Promotion: 'isPromotion',
} as const;

/**
 * Type representing the possible static property names for Message subcomponents.
 */
export type MessageSubcomponentProperty =
  (typeof MessageSubcomponentProperty)[keyof typeof MessageSubcomponentProperty];

export type ActionsType = ForwardRefExoticComponent<MessageActionsProps> & {
  [MessageSubcomponentProperty.Actions]?: boolean;
};

export type LinksType = ForwardRefExoticComponent<MessageLinksProps> & {
  [MessageSubcomponentProperty.Links]?: boolean;
};

export type VerifiedBannerType =
  ForwardRefExoticComponent<MessageVerifiedBannerProps> & {
    [MessageSubcomponentProperty.VerifiedBanner]?: boolean;
  };

export type PromotionType = ForwardRefExoticComponent<MessagePromotionProps> & {
  [MessageSubcomponentProperty.Promotion]?: boolean;
};
