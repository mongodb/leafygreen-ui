import React from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body, H2, Link } from '@leafygreen-ui/typography';

import {
  buttonContainerStyles,
  externalLinkStyles,
  featureContainerStyles,
  featureDescriptionStyles,
  featuresContainerStyles,
  featureTitleStyles,
  rootStyles,
  thumbnailWrapperStyles,
  titleColorStyles,
  titleStyles,
} from './FeaturesEmptyState.styles';
import { Feature, FeaturesEmptyStateProps } from './FeaturesEmptyState.types';

const MIN_NUM_FEATURES = 2;
const MAX_NUM_FEATURES = 3;

export function FeaturesEmptyState({
  title,
  features,
  PrimaryButton,
  SecondaryButton,
  ExternalLink,
  darkMode: darkModeProp,
}: FeaturesEmptyStateProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  if (
    MIN_NUM_FEATURES > features.length ||
    features.length > MAX_NUM_FEATURES
  ) {
    console.warn(
      'The `FeaturesEmptyState` component should only render 2-3 features.',
    );
  }

  if (!isComponentType(PrimaryButton, 'Button')) {
    console.warn(
      'The `PrimaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
    );
  }

  if (!isComponentType(SecondaryButton, 'Button')) {
    console.warn(
      'The `SecondaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
    );
  }

  if (!PrimaryButton && !!SecondaryButton) {
    console.warn(
      'The `SecondaryButton` prop in `FeaturesEmptyState` should only be used when the `PrimaryButton` prop is also used.',
    );
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={rootStyles}>
        <H2 className={cx(titleStyles, titleColorStyles[theme])}>{title}</H2>
        <div className={featuresContainerStyles}>
          {features.map(({ thumbnail, title, description }: Feature) => (
            <div key={title} className={featureContainerStyles}>
              <div className={thumbnailWrapperStyles}>{thumbnail}</div>
              <Body className={featureTitleStyles[theme]}>
                <b>{title}</b>
              </Body>
              <Body className={featureDescriptionStyles[theme]}>
                {description}
              </Body>
            </div>
          ))}
        </div>
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
            <Link target="_blank" {...ExternalLink.props} />
          </div>
        )}
      </div>
    </LeafyGreenProvider>
  );
}

FeaturesEmptyState.propTypes = {
  darkMode: PropTypes.bool,
  ExternalLink: PropTypes.element,
  SecondaryButton: PropTypes.element,
  PrimaryButton: PropTypes.element,
  description: PropTypes.oneOf([PropTypes.element, PropTypes.string])
    .isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.element,
};

FeaturesEmptyState.displayName = 'FeaturesEmptyState';
