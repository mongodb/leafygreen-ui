import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';

import { ConfigurationParameters, Status } from '../shared.types';

import {
  bannerWrapperStyles,
  boldedTextStyle,
  listStyles,
} from './StatusBanner.styles';

export const StatusBanner = ({
  status,
  appliedParameters,
  failedParameters,
}: {
  status: Status;
  appliedParameters?: ConfigurationParameters;
  failedParameters?: ConfigurationParameters;
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
