import React from 'react';

import Banner, { Variant as BannerVariant } from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';

import {
  ApplyButtonStyle,
  BannerWrapperStyle,
  BoldedTextStyle,
  DividerStyle,
  GeneralErrorContainerStyle,
  ListStyle,
  SuggestionCardWrapperStyle,
  TableCellStyle,
  TableHeaderStyle,
  TableStyle,
} from './SuggestionCard.styles';
import { Status, SuggestionCardProps } from './SuggestionCard.types';

const SuggestionCard = (props: SuggestionCardProps) => {
  const { status, suggestedConfigurationParameters, handleApply, handleRetry } = props;
  const { clusterTier, price, cloudProvider, storage, ram, vCPUs } =
    suggestedConfigurationParameters;

  const clusterConfigurationBannerContent = (
    <ul className={ListStyle}>
      <li>
        <u>Cloud Provider & Region</u>: {cloudProvider}
      </li>
      <li>
        <u>Cluster Tier</u>: {clusterTier}
      </li>
    </ul>
  );

  const StatusBanner = ({ status }: { status: Status }) => {
    return (
      <Banner
        className={BannerWrapperStyle}
        variant={
          status === Status.Success
            ? BannerVariant.Success
            : BannerVariant.Danger
        }
      >
        <div>
          <div className={BoldedTextStyle}>
            {status === Status.Success && (
              <>The suggestions have been applied.</>
            )}
            {status === Status.ApplyError && (
              <>
                We ran into an error when applying the suggestion. Please
                manually try it:
              </>
            )}
          </div>
          {(status === Status.Success || status === Status.ApplyError) &&
            clusterConfigurationBannerContent}
          {status === Status.GeneralError && (
            <div className={GeneralErrorContainerStyle}>
              <div>Oops....Something went wrong.</div>
              <Button size="xsmall" onClick={handleRetry}>RETRY</Button>
            </div>
          )}
        </div>
      </Banner>
    );
  };

  return (
    <div className={DividerStyle}>
      <div className={SuggestionCardWrapperStyle}>
        <div className={BoldedTextStyle}>
          Apply configuration to your cluster?
        </div>
        <table className={TableStyle}>
          <tr>
            <th className={TableHeaderStyle}>Cluster Tier</th>
            <td className={TableCellStyle}>
              {clusterTier} ({price})
            </td>
          </tr>
          <tr>
            <th className={TableHeaderStyle}>Provider</th>
            <td className={TableCellStyle}>{cloudProvider}</td>
          </tr>
          <tr>
            <th className={TableHeaderStyle}>Storage</th>
            <td className={TableCellStyle}>{storage}</td>
          </tr>
          <tr>
            <th className={TableHeaderStyle}>RAM</th>
            <td className={TableCellStyle}>{ram}</td>
          </tr>
          <tr>
            <th className={TableHeaderStyle}>vCPUs</th>
            <td className={TableCellStyle}>{vCPUs}</td>
          </tr>
        </table>
        {status === Status.Apply && (
          <Button className={ApplyButtonStyle} variant="primary" size="small" leftGlyph={<ArrowLeftIcon />} onClick={handleApply}>
            Apply these suggestions
          </Button>
        )}
      </div>

      {(
        [
          Status.Success,
          Status.ApplyError,
          Status.GeneralError,
        ] as Array<Status>
      ).includes(status) && <StatusBanner status={status} />}
    </div>
  );
};

export default SuggestionCard;

SuggestionCard.displayName = 'SuggestionCard';
