import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { MessageContent } from '../MessageContent';

import {
  promotionContainerStyles,
  promotionIconStyles,
  promotionLearnMoreStyles,
} from './MessagePromotion.styles';
import { type MessagePromotionProps } from './MessagePromotion.types';

/**
 * MessagePromotion component renders promotional content with an award icon and optional "Learn More" link.
 * It integrates with the MessageContent component to support markdown rendering of promotional text.
 *
 * @param props - Component properties
 * @returns The rendered promotional message component, or null if no promotionText is provided
 */
export function MessagePromotion({
  baseFontSize,
  promotionText,
  promotionUrl,
  onPromotionClick,
  promotionContentType = 'markdown',
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
      <MessageContent
        baseFontSize={baseFontSize}
        markdownProps={{ ...markdownProps }}
        sourceType={promotionContentType}
        onClick={onPromotionClick}
        {...rest}
      >
        {promotionText}
      </MessageContent>
      {promotionUrl ? (
        <Disclaimer className={promotionLearnMoreStyles}>
          {promotionUrl && (
            <>
              {' '}
              <Link href={promotionUrl} onClick={onPromotionClick}>
                Learn More
              </Link>
            </>
          )}
        </Disclaimer>
      ) : null}
    </div>
  );
}
