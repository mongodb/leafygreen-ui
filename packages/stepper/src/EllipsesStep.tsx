import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from './InternalStep';
import { StepStates, EllipsesStepProps, EllipsesStepStates } from './types';

const EllipsesStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  darkMode,
  ...rest
}: React.PropsWithChildren<EllipsesStepProps>) => {
  // TODO: would be good to define main styles and put ol styles inside, but it is currently impossible because the <Tooltip> content is an iframe.
  const tooltipStyles = css`
    // TODO: this is an arbitrary value. It would be nice to have a separate component for <ol> that handles this spacing.
    padding-inline-start: ${spacing[4]}px;
  `;

  const completedMultipleStyles = css`
    &:hover .lg-ui-step-icon {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px
        ${darkMode ? palette.green.dark1 : palette.green.light2};
    }
  `;

  const upcomingMultipleStyles = css`
    &:hover .lg-ui-step-icon {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px
        ${darkMode ? palette.gray.dark2 : palette.gray.light2};
    }
  `;

  const stepStyles: Record<EllipsesStepStates, string> = {
    [StepStates.CompletedMultiple]: completedMultipleStyles,
    [StepStates.UpcomingMultiple]: upcomingMultipleStyles,
  };

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      darkMode={darkMode}
      trigger={
        // The <li> needs to be defined here and not in <Stepper> because the Tooltip doesn't trigger without a wrapping HTML element.
        <li>
          <Step
            className={stepStyles[state]}
            state={state}
            tabIndex={0}
            darkMode={darkMode}
            {...rest}
          >
            {children}
          </Step>
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

export default EllipsesStep;
