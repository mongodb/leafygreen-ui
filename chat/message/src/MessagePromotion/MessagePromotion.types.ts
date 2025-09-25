import React from 'react';

export interface MessagePromotionProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Promotion text content.
   */
  promotionText: string;

  /**
   * Promotion URL.
   */
  promotionUrl?: string;

  /**
   * Promotion onClick callback handler
   */
  onPromotionClick?: () => void;
}
