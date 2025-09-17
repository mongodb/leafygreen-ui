import React from 'react';

import Icon from '@leafygreen-ui/icon';

import { MessageContent } from '../MessageContent';
import { type MessagePromotionProps } from './MessagePromotion.types';
import { containerStyles, iconStyles } from './MessagePromotion.styles';

// Open markdown link in new tab
function MarkdownLinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export function MessagePromotion({
  baseFontSize,
  promotionText,
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
        markdownProps={{ ...markdownProps, components: { a: MarkdownLinkRenderer } }}
        sourceType={promotionContentType}
        onClick={onPromotionClick}
        {...rest}
      >
        {promotionText}
      </MessageContent>
    </div>
  )
}