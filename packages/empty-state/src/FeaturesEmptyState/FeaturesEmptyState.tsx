import React, { forwardRef, Ref } from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
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
  graphicWrapperStyles,
  rootStyles,
  titleStyles,
} from './FeaturesEmptyState.styles';
import { Feature, FeaturesEmptyStateProps } from './FeaturesEmptyState.types';

export const MIN_NUM_FEATURES = 2;
export const MAX_NUM_FEATURES = 3;

export const FeaturesEmptyState = forwardRef(
  (
    {
      title,
      features,
      primaryButton,
      secondaryButton,
      externalLink,
      darkMode: darkModeProp,
    }: FeaturesEmptyStateProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { theme, darkMode } = useDarkMode(darkModeProp);

    if (
      features.length < MIN_NUM_FEATURES ||
      features.length > MAX_NUM_FEATURES
    ) {
      console.error(
        `The \`FeaturesEmptyState\` component should only render ${MIN_NUM_FEATURES}-${MAX_NUM_FEATURES} features.`,
      );
    }

    if (!!primaryButton && !isComponentType(primaryButton, 'Button')) {
      console.error(
        'The `primaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
      );
    }

    if (!!secondaryButton && !isComponentType(secondaryButton, 'Button')) {
      console.error(
        'The `secondaryButton` prop in `FeaturesEmptyState` should be of type LeafyGreen Button.',
      );
    }

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={rootStyles} ref={ref}>
          <H3 className={titleStyles}>{title}</H3>
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
          <div className={buttonContainerStyles}>
            <Button {...primaryButton.props} variant="primary" />
            {!!secondaryButton && (
              <Button {...secondaryButton.props} variant="default" />
            )}
          </div>
          {!!externalLink && (
            <div className={externalLinkStyles}>
              <Link
                data-testid="features-empty-states-link"
                target="_blank"
                {...externalLink.props}
              />
            </div>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

FeaturesEmptyState.propTypes = {
  darkMode: PropTypes.bool,
  externalLink: PropTypes.element,
  secondaryButton: PropTypes.element,
  primaryButton: PropTypes.element.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.exact({
      graphic: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  title: PropTypes.string.isRequired,
};

FeaturesEmptyState.displayName = 'FeaturesEmptyState';
