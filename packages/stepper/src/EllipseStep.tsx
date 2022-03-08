import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Tooltip, { TriggerEvent, Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from './NewStep';
import { StepCompletionStates, EllipseStepProps } from './types';

const EllipseStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  ...rest
}: React.PropsWithChildren<EllipseStepProps>) => {
  const completedMultipleStyles = css`
    &:hover .step-icon {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.green.light2};
    }
  `;

  const upcomingMultipleStyles = css`
    &:hover .step-icon {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.gray.light2};
    }
  `;

  const stepStyles = {
    [StepCompletionStates.CompletedMultiple]: completedMultipleStyles,
    [StepCompletionStates.UpcomingMultiple]: upcomingMultipleStyles,
  };

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      trigger={
        <Step className={cx(stepStyles[state])} state={state} {...rest}>
          {children}
        </Step>
      }
      triggerEvent={TriggerEvent.Hover}
    >
      <ol>
        {React.Children.map(tooltipContent, stepContents => (
          <li value={startingStepIndex}>{stepContents}</li>
        ))}
      </ol>
    </Tooltip>
  );
};

export default EllipseStep;
