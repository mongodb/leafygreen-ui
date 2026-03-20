import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface PromotionProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
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
  onPromotionLinkClick?: () => void;
}
