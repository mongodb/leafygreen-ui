import React from 'react';

import Badge, { Variant } from '@leafygreen-ui/badge';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body, Link } from '@leafygreen-ui/typography';

import {
  badgeStyles,
  promotionContainerStyles,
} from './MessagePromotion.styles';
import { type MessagePromotionProps } from './MessagePromotion.types';

/**
 * Renders promotional content with an award icon and optional "Learn More" link.
 *
 * @returns The rendered promotional message component.
 */
export function MessagePromotion({
  promotionText,
  promotionUrl,
  onPromotionClick,
  darkMode: darkModeProp,
  ...rest
}: MessagePromotionProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={promotionContainerStyles}>
        <div>
          <Badge variant={Variant.Green} className={badgeStyles}>
            <Icon glyph="Award" />
          </Badge>
        </div>
        <Body as="span" {...rest}>
          {promotionText}
          <>
            {' '}
            <Link href={promotionUrl} onClick={onPromotionClick}>
              Learn More
            </Link>
          </>
        </Body>
      </div>
    </LeafyGreenProvider>
  );
}
