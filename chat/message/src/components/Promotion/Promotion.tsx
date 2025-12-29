import React, { forwardRef } from 'react';

import { Badge, Variant } from '@leafygreen-ui/badge';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body, Link } from '@leafygreen-ui/typography';

import { MessageSubcomponentProperty } from '../../shared.types';

import { badgeStyles, promotionContainerStyles } from './Promotion.styles';
import { type PromotionProps } from './Promotion.types';

/**
 * Renders promotional content with an award icon and "Learn More" link.
 *
 * @returns The rendered promotional message component.
 */
export const Promotion = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, PromotionProps>(
    (
      {
        promotionText,
        promotionUrl,
        onPromotionLinkClick,
        darkMode: darkModeProp,
        className,
        ...rest
      },
      fwdRef,
    ) => {
      const { darkMode } = useDarkMode(darkModeProp);
      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <div
            ref={fwdRef}
            className={cx(promotionContainerStyles, className)}
            {...rest}
          >
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
    },
  ),
  {
    displayName: 'Promotion',
    key: MessageSubcomponentProperty.Promotion,
  },
);
