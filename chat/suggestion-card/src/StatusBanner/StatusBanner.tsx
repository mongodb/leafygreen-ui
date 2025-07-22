import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';

import {
  bannerWrapperStyles,
  boldedTextStyle,
  listStyles,
} from '../SuggestionCard/SuggestionCard.styles';
import {
  ConfigurationParameters,
  Status,
  SuggestionCardProps,
} from '../SuggestionCard/SuggestionCard.types';

export const StatusBanner = ({
  status,
  appliedParameters,
  failedParameters,
}: {
  status: Status;
  appliedParameters: SuggestionCardProps['appliedParameters'];
  failedParameters: SuggestionCardProps['failedParameters'];
}) => {
  const clusterConfigurationBannerContent = (
    parameters?: ConfigurationParameters,
  ) => {
    return (
      <ul className={listStyles}>
        {Object.entries(parameters ?? {}).map(([key, value]) => (
          <li key={key}>
            <u>{key}</u>: {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Banner
      className={bannerWrapperStyles}
      variant={
        status === Status.Success ? BannerVariant.Success : BannerVariant.Danger
      }
    >
      <div>
        {status === Status.Success && (
          <>
            <div className={boldedTextStyle}>
              The suggestions have been applied.
            </div>
            {clusterConfigurationBannerContent(appliedParameters)}
          </>
        )}
        {status === Status.Error && (
          <>
            <div className={boldedTextStyle}>
              We ran into an error when applying the suggestion. Please manually
              try it:
            </div>
            {clusterConfigurationBannerContent(failedParameters)}
          </>
        )}
      </div>
    </Banner>
  );
};
