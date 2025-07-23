import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';

import { ConfigurationParameter, Status } from '../shared.types';

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
  appliedParameters?: Array<ConfigurationParameter>;
  failedParameters?: Array<ConfigurationParameter>;
}) => {
  const clusterConfigurationBannerContent = (
    parameters?: Array<ConfigurationParameter>,
  ) => {
    return (
      <ul className={listStyles}>
        {(parameters ?? []).map(param => (
          <li key={param.key}>
            <u>{param.key}</u>: {param.value}
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
