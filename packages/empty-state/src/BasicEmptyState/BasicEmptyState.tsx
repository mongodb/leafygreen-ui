import React from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body, H3, Link } from '@leafygreen-ui/typography';

import {
  buttonContainerStyles,
  descriptionStyles,
  externalLinkStyles,
  rootStyles,
  textContainerStyles,
  titleStyles,
} from './BasicEmptyState.styles';
import { BasicEmptyStateProps } from '.';

export function BasicEmptyState({
  thumbnail,
  title,
  description,
  PrimaryButton,
  SecondaryButton,
  ExternalLink,
  darkMode: darkModeProp,
}: BasicEmptyStateProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  if (!isComponentType(PrimaryButton, 'Button')) {
    console.error(
      'The `PrimaryButton` prop in BasicEmptyState should be of type LeafyGreen Button.',
    );
  }

  if (!isComponentType(SecondaryButton, 'Button')) {
    console.error(
      'The `SecondaryButton` prop in BasicEmptyState should be of type LeafyGreen Button.',
    );
  }

  if (!PrimaryButton && !!SecondaryButton) {
    console.error(
      'The `SecondaryButton` prop in BasicEmptyState should only be used when the `PrimaryButton` prop is also used.',
    );
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={rootStyles}>
        {!!thumbnail && <div>{thumbnail}</div>}
        <div className={textContainerStyles}>
          <H3 className={titleStyles}>{title}</H3>
          <Body className={descriptionStyles[theme]}>{description}</Body>
          {!!PrimaryButton && (
            <div className={buttonContainerStyles}>
              <Button {...PrimaryButton.props} variant="primary" />
              {!!SecondaryButton && (
                <Button {...SecondaryButton.props} variant="default" />
              )}
            </div>
          )}
          {!!ExternalLink && (
            <div className={externalLinkStyles}>
              <Link
                data-testid="basic-empty-states-link"
                target="_blank"
                {...ExternalLink.props}
              />
            </div>
          )}
        </div>
      </div>
    </LeafyGreenProvider>
  );
}

BasicEmptyState.propTypes = {
  darkMode: PropTypes.bool,
  ExternalLink: PropTypes.element,
  SecondaryButton: PropTypes.element,
  PrimaryButton: PropTypes.element,
  description: PropTypes.oneOf([PropTypes.element, PropTypes.string])
    .isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.element,
};

BasicEmptyState.displayName = 'BasicEmptyState';
