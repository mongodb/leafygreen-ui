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
      // @ts-expect-error - Card does not correctly infer props based on `as` prop
      <Card
        darkMode={darkMode}
        ref={ref}
        className={cx(baseStyles, themeStyles[theme], {
          [badgeAreaStyles]: showBadge,
          [imageBackgroundStyles(imageUrl ?? '')]: showImageBackground,
        })}
        as="a"
        href={href}
        target="_blank"
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
