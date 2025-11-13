import React from 'react';

import { Badge, Variant } from '@leafygreen-ui/badge';
import { cx } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
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
 * Renders promotional content with an award icon and "Learn More" link.
 *
 * @returns The rendered promotional message component.
 */
export function MessagePromotion({
  promotionText,
  promotionUrl,
  onPromotionLinkClick,
  darkMode: darkModeProp,
  className,
  ...rest
}: MessagePromotionProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={cx(promotionContainerStyles, className)} {...rest}>
        <Badge variant={Variant.Green} className={badgeStyles}>
          <Icon glyph="Award" />
        </Badge>
        <Body as="span">
          {promotionText}
          <>
            {' '}
            <Link href={promotionUrl} onClick={onPromotionLinkClick}>
              Learn More
            </Link>
          </>
        </Body>
      </div>
    </LeafyGreenProvider>
  );
}
