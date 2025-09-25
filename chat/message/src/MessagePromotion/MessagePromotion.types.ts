import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface MessagePromotionProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>,
    DarkModeProps {
  /**
   * Promotion text content.
   */
  promotionText: string;

  /**
   * Promotion URL.
   */
  promotionUrl: string;

  /**
   * Promotion onClick callback handler
   */
  onPromotionClick?: () => void;
}
