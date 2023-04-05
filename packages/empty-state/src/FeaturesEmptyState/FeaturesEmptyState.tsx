import React from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body, H3, Link } from '@leafygreen-ui/typography';

import {
  buttonContainerStyles,
  externalLinkStyles,
  featureContainerStyles,
  featureDescriptionStyles,
  featuresContainerStyles,
  rootStyles,
  graphicWrapperStyles,
  titleStyles,
} from './FeaturesEmptyState.styles';
import { Feature, FeaturesEmptyStateProps } from './FeaturesEmptyState.types';

export const MIN_NUM_FEATURES = 2;
export const MAX_NUM_FEATURES = 3;

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
    features.length < MIN_NUM_FEATURES ||
    features.length > MAX_NUM_FEATURES
  ) {
    console.error(
      `The \`FeaturesEmptyState\` component should only render ${MIN_NUM_FEATURES}-${MAX_NUM_FEATURES} features.`,
    );
  }

  if (!!PrimaryButton && !isComponentType(PrimaryButton, 'Button')) {
    console.error(
      'The `PrimaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
    );
  }

  if (!!SecondaryButton && !isComponentType(SecondaryButton, 'Button')) {
    console.error(
      'The `SecondaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
    );
  }

  if (!PrimaryButton && !!SecondaryButton) {
    console.error(
      'The `SecondaryButton` prop in `FeaturesEmptyState` should only be used when the `PrimaryButton` prop is also used.',
    );
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={rootStyles}>
        <H3 className={cx(titleStyles)}>{title}</H3>
        <div className={featuresContainerStyles}>
          {!!features &&
            features.map(({ graphic, title, description }: Feature) => (
              <div key={title} className={featureContainerStyles}>
                <div className={graphicWrapperStyles}>{graphic}</div>
                <Body>
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
            <Link
              data-testid="features-empty-states-link"
              target="_blank"
              {...ExternalLink.props}
            />
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
  features: PropTypes.arrayOf(
    PropTypes.exact({
      graphic: PropTypes.element,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  title: PropTypes.string.isRequired,
  graphic: PropTypes.element,
};

FeaturesEmptyState.displayName = 'FeaturesEmptyState';
