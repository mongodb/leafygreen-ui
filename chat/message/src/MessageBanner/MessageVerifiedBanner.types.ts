import React from 'react';

export interface BaseMessageVerifiedBannerProps {
  /**
   * URL to learn more about the verification.
   */
  learnMoreUrl?: string;

  /**
   * The time the message was last verified.
   * @example new Date("2024-03-24T16:20:00Z")
   */
  verifiedAt?: Date;

  /**
   * The name of the entity that verified the message.
   * @example "MongoDB Staff"
   */
  verifier?: string;
}

export interface MessageVerifiedBannerProps
  extends BaseMessageVerifiedBannerProps,
    React.ComponentPropsWithRef<'div'> {}
