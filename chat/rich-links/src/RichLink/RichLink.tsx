import React, { forwardRef } from 'react';

import Card from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';
import { Body } from '@leafygreen-ui/typography';

import {
  badgeAreaStyles,
  baseStyles,
  imageBackgroundStyles,
  richLinkTextClassName,
  themeStyles,
} from './RichLink.styles';
import {
  RichLinkBadgeControlProps,
  type RichLinkProps,
} from './RichLink.types';
import { RichLinkBadge } from './RichLinkBadge';
import { richLinkVariants } from './RichLinkVariants';

export const RichLink = forwardRef<HTMLAnchorElement, RichLinkProps>(
  ({ darkMode: darkModeProp, ...props }, ref) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    if ('variant' in props) {
      const { variant, ...variantProps } = props;
      const RichLinkVariant = richLinkVariants[variant];
      return <RichLinkVariant darkMode={darkMode} {...variantProps} />;
    }

    const badgeDefaults: Partial<RichLinkBadgeControlProps> = {
      badgeGlyph: undefined,
      badgeLabel: undefined,
      badgeColor: undefined,
    };

    const {
      children,
      imageUrl,
      badgeGlyph,
      badgeLabel,
      badgeColor,
      href,
      ...anchorProps
    } = {
      ...badgeDefaults,
      ...props,
    };

    const showBadge = badgeLabel !== undefined;

    const showImageBackground = (imageUrl?.length ?? -1) > 0;

    const conditionalProps = href
      ? {
          as: 'a' as PolymorphicAs,
          href,
          ref: ref,
          target: '_blank',
          ...anchorProps,
        }
      : {};

    return (
      <Card
        darkMode={darkMode}
        className={cx(baseStyles, themeStyles[theme], {
          [badgeAreaStyles]: showBadge,
          [imageBackgroundStyles(imageUrl ?? '')]: showImageBackground,
        })}
        {...conditionalProps}
      >
        <Body className={richLinkTextClassName} darkMode={darkMode}>
          {children}
        </Body>
        {showBadge ? (
          <RichLinkBadge
            darkMode={darkMode}
            color={badgeColor}
            label={badgeLabel}
            glyph={badgeGlyph}
          />
        ) : null}
      </Card>
    );
  },
);

RichLink.displayName = 'RichLink';
