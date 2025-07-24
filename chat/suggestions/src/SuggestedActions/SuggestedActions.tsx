import React, { forwardRef } from 'react';

import Button from '@leafygreen-ui/button';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { State } from '../shared.types';
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
  (props: SuggestedActionsProps, fwdRef: React.Ref<HTMLDivElement>) => {
    const {
      state,
      configurationParameters,
      onClickApply,
      darkMode: darkModeProp,
    } = props;
    const { theme, darkMode } = useDarkMode(darkModeProp);

    // Filter parameters by state
    const successParameters = configurationParameters.filter(
      param => param.state === State.Success,
    );
    const errorParameters = configurationParameters.filter(
      param => param.state === State.Error,
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
            {state === State.Unset && (
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

          {([State.Success, State.Error] as Array<State>).includes(state) && (
            <StatusBanner
              state={state}
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
