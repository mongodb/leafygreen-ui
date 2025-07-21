import React, { forwardRef } from 'react';

import Button from '@leafygreen-ui/button';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { StatusBanner } from '../StatusBanner/StatusBanner';

import {
  applyButtonStyles,
  boldedTextStyle,
  getSuggetionCardWrapperStyles,
  tableCellStyles,
  tableHeaderStyles,
  tableStyles,
} from './SuggestionCard.styles';
import { Status, SuggestionCardProps } from './SuggestionCard.types';

const SuggestionCard = forwardRef<HTMLDivElement, SuggestionCardProps>(
  (props, fwdRef) => {
    const {
      status,
      suggestedConfigurationParameters,
      handleApply,
      darkMode: darkModeProp,
    } = props;
    const { clusterTier, price, cloudProvider, storage, ram, vCPUs } =
      suggestedConfigurationParameters;
    const { theme, darkMode } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={fwdRef}>
          <div className={getSuggetionCardWrapperStyles(theme)}>
            <div className={boldedTextStyle}>
              Apply configuration to your cluster?
            </div>
            <table className={tableStyles}>
              <tr>
                <th className={tableHeaderStyles}>Cluster Tier</th>
                <td className={tableCellStyles}>
                  {clusterTier} ({price})
                </td>
              </tr>
              <tr>
                <th className={tableHeaderStyles}>Provider</th>
                <td className={tableCellStyles}>{cloudProvider}</td>
              </tr>
              <tr>
                <th className={tableHeaderStyles}>Storage</th>
                <td className={tableCellStyles}>{storage}</td>
              </tr>
              <tr>
                <th className={tableHeaderStyles}>RAM</th>
                <td className={tableCellStyles}>{ram}</td>
              </tr>
              <tr>
                <th className={tableHeaderStyles}>vCPUs</th>
                <td className={tableCellStyles}>{vCPUs}</td>
              </tr>
            </table>
            {status === Status.Apply && (
              <Button
                className={applyButtonStyles}
                variant="primary"
                size="small"
                leftGlyph={<ArrowLeftIcon />}
                onClick={handleApply}
              >
                Apply these suggestions
              </Button>
            )}
          </div>

          {([Status.Success, Status.Error] as Array<Status>).includes(
            status,
          ) && (
            <StatusBanner
              status={status}
              suggestedConfigurationParameters={
                suggestedConfigurationParameters
              }
            />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

export default SuggestionCard;

SuggestionCard.displayName = 'SuggestionCard';
