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
  dividerStyle,
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
      appliedParameters,
      failedParameters,
      onClickApply,
      darkMode: darkModeProp,
    } = props;
    const { theme, darkMode } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={fwdRef} className={dividerStyle}>
          <div className={getSuggetionCardWrapperStyles(theme)}>
            <div className={boldedTextStyle}>
              Apply configuration to your cluster?
            </div>
            <table className={tableStyles}>
              {Object.entries(suggestedConfigurationParameters).map(
                ([key, value]) => (
                  <tr key={key}>
                    <th className={tableHeaderStyles}>{key}</th>
                    <td className={tableCellStyles}>{value}</td>
                  </tr>
                ),
              )}
            </table>
            {status === Status.Apply && (
              <Button
                className={applyButtonStyles}
                variant="primary"
                size="small"
                leftGlyph={<ArrowLeftIcon />}
                onClick={onClickApply}
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
              appliedParameters={appliedParameters}
              failedParameters={failedParameters}
            />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

export default SuggestionCard;

SuggestionCard.displayName = 'SuggestionCard';
