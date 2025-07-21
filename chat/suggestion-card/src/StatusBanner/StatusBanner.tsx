import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';

import {
  bannerWrapperStyles,
  boldedTextStyle,
  listStyles,
} from '../SuggestionCard/SuggestionCard.styles';
import {
  Status,
  SuggestionCardProps,
} from '../SuggestionCard/SuggestionCard.types';

export const StatusBanner = ({
  status,
  suggestedConfigurationParameters,
}: {
  status: Status;
  suggestedConfigurationParameters: SuggestionCardProps['suggestedConfigurationParameters'];
}) => {
  const { cloudProvider, clusterTier } = suggestedConfigurationParameters;

  const clusterConfigurationBannerContent = (
    <ul className={listStyles}>
      <li>
        <u>Cloud Provider & Region</u>: {cloudProvider}
      </li>
      <li>
        <u>Cluster Tier</u>: {clusterTier}
      </li>
    </ul>
  );

  return (
    <Banner
      className={bannerWrapperStyles}
      variant={
        status === Status.Success ? BannerVariant.Success : BannerVariant.Danger
      }
    >
      <div>
        <div className={boldedTextStyle}>
          {status === Status.Success && <>The suggestions have been applied.</>}
          {status === Status.Error && (
            <>
              We ran into an error when applying the suggestion. Please manually
              try it:
            </>
          )}
        </div>
        {clusterConfigurationBannerContent}
      </div>
    </Banner>
  );
};
