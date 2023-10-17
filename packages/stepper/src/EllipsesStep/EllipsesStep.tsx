import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';

import { InternalStep } from '../InternalStep';

import { getMultipleStyles, tooltipStyles } from './EllipsesStep.styles';
import { EllipsesStepProps } from './EllipsesStep.types';

export const EllipsesStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  ...rest
}: React.PropsWithChildren<EllipsesStepProps>) => {
  const { darkMode, theme } = useDarkMode();

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      darkMode={darkMode}
      trigger={
        // The <li> needs to be defined here and not in <Stepper> because the Tooltip doesn't trigger without a wrapping HTML element.
        <li>
          <InternalStep
            className={getMultipleStyles(theme, state)}
            state={state}
            tabIndex={0}
            {...rest}
          >
            {children}
          </InternalStep>
        </li>
      }
    >
      <div>
        <ol className={tooltipStyles}>
          {React.Children.map(tooltipContent, (stepContents, i) => (
            <li value={startingStepIndex + i}>{stepContents}</li>
          ))}
        </ol>
      </div>
    </Tooltip>
  );
};
