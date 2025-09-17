import React from 'react';

import Icon from '@leafygreen-ui/icon';

import { MessageContent } from '../MessageContent';
import { type MessagePromotionProps } from './MessagePromotion.types';
import { containerStyles, iconStyles } from './MessagePromotion.styles';

export function MessagePromotion({
  baseFontSize,
  promotionText,
  onPromotionClick,   // TODO figure out link click callback.
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
        markdownProps={markdownProps}
        sourceType="markdown"   // TODO Add a sourceType param to MessagePromotion
        {...rest}
      >
        {promotionText}
      </MessageContent>
    </div>
  )
}