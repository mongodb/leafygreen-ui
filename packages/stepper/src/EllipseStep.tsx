import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import Tooltip, { TriggerEvent, Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from './Step';
import { StepCompletionStates, EllipseStepProps } from './types';

const EllipseStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  ...rest
}: React.PropsWithChildren<EllipseStepProps>) => {
  // TODO: would be good to define main styles and put ol styles inside, but it is currently impossible because the <Tooltip> content is an iframe.
  const tooltipStyles = css`
    // TODO: this is an arbitrary value. It would be nice to have a separate component for <ol> that handles this spacing.
    padding-inline-start: ${spacing[4]}px;
  `;

  const completedMultipleStyles = css`
    &:hover .lg-ui-step-icon {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.green.light2};
    }
  `;

  const upcomingMultipleStyles = css`
    &:hover .lg-ui-step-icon {
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
        // The <li> needs to be defined here and not in <Stepper> because the Tooltip doesn't trigger without a wrapping HTML element.
        <li>
          <Step className={cx(stepStyles[state])} state={state} {...rest}>
            {children}
          </Step>
        </li>
      }
      triggerEvent={TriggerEvent.Hover}
    >
      <ol className={cx(tooltipStyles)}>
        {React.Children.map(tooltipContent, (stepContents, i) => (
          <li value={startingStepIndex + i}>{stepContents}</li>
        ))}
      </ol>
    </Tooltip>
  );
};

export default EllipseStep;
