import React, { forwardRef, Ref } from 'react';

import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body, H3, Link } from '@leafygreen-ui/typography';

import {
  buttonContainerStyles,
  externalLinkStyles,
  getBadgeStyles,
  getDescriptionStyles,
  rootStyles,
  textContainerStyles,
  titleStyles,
} from './BasicEmptyState.styles';
import { BasicEmptyStateProps } from '.';

export const BasicEmptyState = forwardRef(
  (
    {
      graphic,
      badgeProps,
      title,
      description,
      primaryButton,
      secondaryButton,
      externalLink,
      darkMode: darkModeProp,
    }: BasicEmptyStateProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { theme, darkMode } = useDarkMode(darkModeProp);

    if (!!primaryButton && !isComponentType(primaryButton, 'Button')) {
      console.error(
        'The `primaryButton` prop in BasicEmptyState should be of type LeafyGreen Button.',
      );
    }

    if (!!secondaryButton && !isComponentType(secondaryButton, 'Button')) {
      console.error(
        'The `secondaryButton` prop in BasicEmptyState should be of type LeafyGreen Button.',
      );
    }

    if (!primaryButton && !!secondaryButton) {
      console.error(
        'The `secondaryButton` prop in BasicEmptyState should only be used when the `primaryButton` prop is also used.',
      );
    }

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={rootStyles} ref={ref}>
          {!!graphic && <div>{graphic}</div>}
          <div className={textContainerStyles}>
            {badgeProps && (
              <Badge
                {...badgeProps}
                className={getBadgeStyles(badgeProps.className)}
              />
            )}
            <H3 className={titleStyles}>{title}</H3>
            <Body className={getDescriptionStyles(theme)}>{description}</Body>
            {!!primaryButton && (
              <div className={buttonContainerStyles}>
                <Button {...primaryButton.props} variant="primary" />
                {!!secondaryButton && (
                  <Button {...secondaryButton.props} variant="default" />
                )}
              </div>
            )}
            {!!externalLink && (
              <div className={externalLinkStyles}>
                <Link
                  data-testid="basic-empty-states-link"
                  target="_blank"
                  {...externalLink.props}
                />
              </div>
            )}
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

BasicEmptyState.displayName = 'BasicEmptyState';
