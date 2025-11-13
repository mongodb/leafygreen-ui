import React, { forwardRef } from 'react';

import { Badge, Variant as BadgeVariant } from '@leafygreen-ui/badge';
import { Button, Size, Variant as ButtonVariant } from '@leafygreen-ui/button';
import { Card } from '@leafygreen-ui/card';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, Description } from '@leafygreen-ui/typography';

import { LGIDS_INFO_BLOCK } from './constants';
import {
  badgesContainerStyles,
  getContainerStyles,
  getContentContainerStyles,
  getMediaContainerStyles,
  getTextContainerStyles,
} from './InfoBlock.styles';
import { InfoBlockProps, Variant } from './InfoBlock.types';

export const InfoBlock = forwardRef<HTMLDivElement, InfoBlockProps>(
  (
    {
      badgeProps,
      badgePropsArray,
      buttonProps,
      className,
      darkMode: darkModeProp,
      description,
      label,
      media,
      variant = Variant.Card,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const hasMedia = media !== undefined;
    const isCardVariant = variant === Variant.Card;
    const isImageVariant = variant === Variant.Image;

    const ContainerComponent = isCardVariant ? Card : 'div';

    const shouldRenderSingleBadge = isCardVariant && badgeProps !== undefined;
    const shouldRenderMultipleBadges =
      isImageVariant &&
      badgePropsArray !== undefined &&
      badgePropsArray.length > 0;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <ContainerComponent
          {...rest}
          {...(isCardVariant ? { darkMode } : {})}
          className={getContainerStyles(variant, className)}
          ref={fwdRef}
        >
          {hasMedia && (
            <div
              className={getMediaContainerStyles(theme, variant)}
              data-testid={LGIDS_INFO_BLOCK.mediaWrapper}
            >
              {media}
            </div>
          )}
          <div className={getContentContainerStyles(variant, hasMedia)}>
            <div className={getTextContainerStyles(variant)}>
              {shouldRenderSingleBadge && (
                <Badge
                  data-testid={LGIDS_INFO_BLOCK.badge}
                  variant={BadgeVariant.Blue}
                  {...badgeProps}
                />
              )}
              <Body
                data-testid={LGIDS_INFO_BLOCK.label}
                baseFontSize={BaseFontSize.Body2}
                weight="medium"
              >
                {label}
              </Body>
              {description && (
                <Description data-testid={LGIDS_INFO_BLOCK.description}>
                  {description}
                </Description>
              )}
              {shouldRenderMultipleBadges && (
                <div
                  data-testid={LGIDS_INFO_BLOCK.badges}
                  className={badgesContainerStyles}
                >
                  {badgePropsArray.map((badgeProps, i) => (
                    <Badge
                      key={`${i}` + badgeProps.children}
                      variant={BadgeVariant.Blue}
                      {...badgeProps}
                    />
                  ))}
                </div>
              )}
            </div>
            {buttonProps && (
              <Button
                data-testid={LGIDS_INFO_BLOCK.button}
                size={Size.Small}
                variant={ButtonVariant.Default}
                {...buttonProps}
              />
            )}
          </div>
        </ContainerComponent>
      </LeafyGreenProvider>
    );
  },
);

InfoBlock.displayName = 'InfoBlock';
