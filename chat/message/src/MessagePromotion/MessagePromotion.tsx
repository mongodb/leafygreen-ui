import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { Body, Link } from '@leafygreen-ui/typography';

import {
  promotionContainerStyles,
  promotionIconStyles,
  promotionLearnMoreStyles,
} from './MessagePromotion.styles';
import { type MessagePromotionProps } from './MessagePromotion.types';

/**
 * Renders promotional content with an award icon and optional "Learn More" link.
 *
 * @returns The rendered promotional message component, or null if no promotionText is provided
 */
export function MessagePromotion({
  baseFontSize,
  promotionText,
  promotionUrl,
  onPromotionClick,
  markdownProps,
  ...rest
}: MessagePromotionProps) {
  if (!promotionText) {
    return null;
  }

  return (
    <div className={promotionContainerStyles}>
      <div className={promotionIconStyles}>
        <Icon glyph="Award" />
      </div>
      <Body className={promotionLearnMoreStyles} baseFontSize={baseFontSize} {...rest}>
        {promotionText}
        {promotionUrl && (
          <>
            {' '}
            <Link href={promotionUrl} onClick={onPromotionClick} baseFontSize={baseFontSize}>
              Learn More
            </Link>
          </>
        )}
      </Body>
    </div>
  );
}
