import React, { forwardRef } from 'react';

import Button from '@leafygreen-ui/button';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Status } from '../shared.types';
import { StatusBanner } from '../StatusBanner/StatusBanner';

import {
  applyButtonStyles,
  boldedTextStyle,
  dividerStyles,
  getSuggestedActionsWrapperStyles,
  tableCellStyles,
  tableHeaderStyles,
  tableStyles,
} from './SuggestedActions.styles';
import { SuggestedActionsProps } from './SuggestedActions.types';

const SuggestedActions = forwardRef<HTMLDivElement, SuggestedActionsProps>(
  (props, fwdRef) => {
    const {
      status,
      configurationParameters,
      onClickApply,
      darkMode: darkModeProp,
    } = props;
    const { theme, darkMode } = useDarkMode(darkModeProp);

    // Filter parameters by status
    const successParameters = configurationParameters.filter(
      param => param.status === Status.Success,
    );
    const errorParameters = configurationParameters.filter(
      param => param.status === Status.Error,
    );

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={fwdRef} className={dividerStyles}>
          <div className={getSuggestedActionsWrapperStyles(theme)}>
            <div className={boldedTextStyle}>
              Apply configuration to your cluster?
            </div>
            <table className={tableStyles}>
              {configurationParameters.map(param => (
                <tr key={param.key}>
                  <th className={tableHeaderStyles}>{param.key}</th>
                  <td className={tableCellStyles}>{param.value}</td>
                </tr>
              ))}
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
              appliedParameters={successParameters}
              failedParameters={errorParameters}
            />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

export default SuggestedActions;

SuggestedActions.displayName = 'SuggestedActions';
