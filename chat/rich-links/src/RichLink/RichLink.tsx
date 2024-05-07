import React from 'react';

import Card from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorphic } from '@leafygreen-ui/polymorphic';
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

export const RichLink = Polymorphic<RichLinkProps>(
  ({ as, darkMode: darkModeProp, ...props }, ref) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    if ('variant' in props) {
      const { variant, ...variantProps } = props;
      const RichLinkVariant = richLinkVariants[variant];

      return (
        // @ts-expect-error
        <RichLinkVariant
          text={variantProps.text}
          imageUrl={variantProps.imageUrl}
          href={variantProps.href}
          anchorProps={variantProps.anchorProps}
        />
      );
    }

    const badgeDefaults: Partial<RichLinkBadgeControlProps> = {
      badgeGlyph: undefined,
      badgeLabel: undefined,
      badgeColor: undefined,
    };

    const {
      text,
      imageUrl,
      badgeGlyph,
      badgeLabel,
      badgeColor,
      href,
      anchorProps,
    } = {
      ...badgeDefaults,
      ...props,
    };

    const showBadge = badgeLabel !== undefined;

    const showImageBackground = (imageUrl?.length ?? -1) > 0;

    return (
      // @ts-expect-error
      <Card
        darkMode={darkMode}
        ref={ref}
        className={cx(baseStyles, themeStyles[theme], {
          [badgeAreaStyles]: showBadge,
          [imageBackgroundStyles(imageUrl ?? '')]: showImageBackground,
        })}
        as={as}
        href={href}
        target="_blank"
        tabIndex={0}
        {...anchorProps}
      >
        <Body className={richLinkTextClassName} darkMode={darkMode}>
          {text}
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
