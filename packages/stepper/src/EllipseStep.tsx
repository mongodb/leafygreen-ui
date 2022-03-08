import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Tooltip, { TriggerEvent, Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from './NewStep';
import { StepCompletionStates, StepProps } from './types';

export type EllipseStepProps = Omit<StepProps, 'state'> & {
  startingStepIndex?: number;
  state:
    | StepCompletionStates.CompletedMultiple
    | StepCompletionStates.UpcomingMultiple;
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

const EllipseStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  iconSize = 20,
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
        <Step
          className={cx(stepStyles[state])}
          state={state}
          {...rest}
        >
          {children}
        </Step>
      }
      triggerEvent={TriggerEvent.Hover}
    >
      <ol>
        {React.Children.map(tooltipContent, (stepContents, i) => (
          <li value={startingStepIndex}>{stepContents}</li>
        ))}
      </ol>
    </Tooltip>
  );
};

export default EllipseStep;
