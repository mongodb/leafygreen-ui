import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { StepStates } from '../types';
import { InternalStepProps } from './types';
import StepIcon from '../StepIcon';
import { useStepperContext } from '../StepperContext';
import StepLabel from '../StepLabel';
import { baseStyles, completedLineStyles, lineStyles } from './styles';

const Step = ({
  children,
  index,
  state,
  ariaLabel = `step${index || ''}`,
  shouldDisplayLine = true,
  iconSize = 20,
  className,
  ...rest
}: InternalStepProps) => {
  const { darkMode } = useStepperContext();
  const isCurrent = state === StepStates.Current;
  const isCompleted =
    state === StepStates.Completed || state === StepStates.CompletedMultiple;

  return (
    <div
      className={cx(
        baseStyles(darkMode),
        {
          [lineStyles(iconSize, darkMode)]: shouldDisplayLine,
          [completedLineStyles(darkMode)]: isCompleted && shouldDisplayLine,
        },
        className,
      )}
      aria-label={ariaLabel}
      aria-current={isCurrent && 'step'}
      {...rest}
    >
      <StepIcon state={state} content={index} size={iconSize} />
      <StepLabel state={state}>{children}</StepLabel>
    </div>
  );
};

export default Step;
