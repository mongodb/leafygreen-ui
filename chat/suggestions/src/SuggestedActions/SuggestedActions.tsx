import React, { forwardRef } from 'react';

import Button from '@leafygreen-ui/button';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { FontWeight } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { State } from '../shared.types';
import { StatusBanner } from '../StatusBanner/StatusBanner';

import {
  getContainerStyles,
  getSuggestedActionsWrapperStyles,
  tableCellStyles,
  tableHeaderStyles,
  tableStyles,
} from './SuggestedActions.styles';
import { SuggestedActionsProps } from './SuggestedActions.types';

const SuggestedActions = forwardRef<HTMLDivElement, SuggestedActionsProps>(
  (
    {
      className,
      configurationParameters,
      darkMode: darkModeProp,
      onClickApply,
      state,
      ...rest
    },
    fwdRef,
  ) => {
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
        <div ref={fwdRef} className={getContainerStyles(className)} {...rest}>
          <div className={getSuggestedActionsWrapperStyles(theme)}>
            {state !== State.Unset && (
              <Body weight={FontWeight.SemiBold}>
                Apply configuration to your cluster?
              </Body>
            )}
            <table className={tableStyles}>
              {configurationParameters.map(param => (
                <tr key={param.key}>
                  <Body
                    as="th"
                    className={tableHeaderStyles}
                    weight={FontWeight.SemiBold}
                  >
                    {param.key}
                  </Body>
                  <Body as="td" className={tableCellStyles}>
                    {param.value}
                  </Body>
                </tr>
              ))}
            </table>
            {state === State.Apply && (
              <Button
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
