import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { MessageContent } from '../MessageContent';

import { containerStyles, iconStyles, learnMoreStyles } from './MessagePromotion.styles';
import { type MessagePromotionProps } from './MessagePromotion.types';

export function MessagePromotion({
  baseFontSize,
  promotionText,
  promotionUrl,
  onPromotionClick,
  promotionContentType = "markdown",
  markdownProps,
  ...rest
}: MessagePromotionProps) {

  if (!promotionText) {
    return null;
  }

  return (
    <div className={containerStyles}>
      <div className={iconStyles} >
        <Icon
          glyph="Award"
        />
      </div>
      <MessageContent
        baseFontSize={baseFontSize}
        markdownProps={{ ...markdownProps}}
        sourceType={promotionContentType}
        onClick={onPromotionClick}
        {...rest}
      >
        {promotionText}
      </MessageContent>
      { promotionUrl ? (
        <Disclaimer className={learnMoreStyles}>
          {promotionUrl && (
            <>
              {' '}
              <Link href={promotionUrl} onClick={onPromotionClick}>Learn More</Link>
            </>
          )}
        </Disclaimer>
      ) : null}
    </div>
  )
}