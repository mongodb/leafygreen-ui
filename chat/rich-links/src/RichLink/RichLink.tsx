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
import { type RichLinkProps } from './RichLink.types';
import { RichLinkBadge } from './RichLinkBadge';
import { richLinkVariants } from './richLinkVariants';

export const RichLink = forwardRef<HTMLAnchorElement, RichLinkProps>(
  ({ darkMode: darkModeProp, ...props }, ref) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const richLinkVariantProps =
      'variant' in props && props.variant !== undefined
        ? richLinkVariants[props.variant]
        : {};

    const {
      children,
      imageUrl,
      badgeGlyph,
      badgeLabel,
      badgeColor,
      href,
      ...anchorProps
    } = {
      badgeGlyph: undefined,
      badgeLabel: undefined,
      badgeColor: undefined,
      ...richLinkVariantProps,
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
