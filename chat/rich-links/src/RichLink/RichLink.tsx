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
import { RichLinkProps } from './RichLink.types';
import { RichLinkBadge } from './RichLinkBadge';
import { richLinkVariants } from './RichLinkVariants';

export const RichLink = forwardRef<HTMLAnchorElement, RichLinkProps>(
  ({ darkMode: darkModeProp, ...props }, ref) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    if ('variant' in props) {
      const { variant, ...restProps } = props;
      const RichLinkVariant = richLinkVariants[variant];
      return <RichLinkVariant darkMode={darkMode} {...restProps} />;
    }

    const {
      url,
      text,
      badgeVariant,
      badgeLabel,
      badgeGlyph,
      imageUrl,
      anchorProps,
    } = props;

    const showBadge = Boolean(badgeLabel);
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
        // @ts-ignore-next-line - Card with `as="a"` should accept all `a` attributes including `href`
        href={url}
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
