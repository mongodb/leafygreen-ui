import React, { forwardRef } from 'react';

import Card from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
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
  RichLinkWithBadgeProps,
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
      badgeVariant: undefined,
    };

    const {
      text,
      imageUrl,
      badgeGlyph,
      badgeLabel,
      badgeVariant,
      ...anchorProps
    } = {
      ...badgeDefaults,
      ...props,
    };

    const showBadge = badgeLabel !== undefined;

    const showImageBackground = (imageUrl?.length ?? -1) > 0;

    return (
      <Card
        darkMode={darkMode}
        ref={ref}
        className={cx(baseStyles, themeStyles[theme], {
          [badgeAreaStyles]: showBadge,
          [imageBackgroundStyles(imageUrl ?? '')]: showImageBackground,
        })}
        as="a"
        target="_blank"
        {...anchorProps}
      >
        <Body className={richLinkTextClassName} darkMode={darkMode}>
          {text}
        </Body>
        {showBadge ? (
          <RichLinkBadge
            darkMode={darkMode}
            variant={badgeVariant}
            label={badgeLabel}
            glyph={badgeGlyph}
          />
        ) : null}
      </Card>
    );
  },
);

RichLink.displayName = 'RichLink';
