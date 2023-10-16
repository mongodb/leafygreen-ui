import React from 'react';
import { StepStates } from 'src/Stepper/Stepper.types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import StepIcon from '../StepIcon/StepIcon';
import StepLabel from '../StepLabel/StepLabel';

import {
  baseStyles,
  completedLineStyles,
  lineStyles,
} from './InternalStep.styles';
import { InternalStepProps } from '.';

export const InternalStep = ({
  children,
  index,
  state,
  ariaLabel = `step${index || ''}`,
  shouldDisplayLine = true,
  iconSize = 20,
  className,
  ...rest
}: InternalStepProps) => {
  const { darkMode, theme } = useDarkMode();
  const isCurrent = state === StepStates.Current;
  const isCompleted =
    state === StepStates.Completed || state === StepStates.CompletedMultiple;

  return (
    <div
      className={cx(
        baseStyles,
        {
          [lineStyles(iconSize, darkMode)]: shouldDisplayLine,
          [completedLineStyles[theme]]: isCompleted && shouldDisplayLine,
        },
        className,
      )}
      aria-label={ariaLabel}
      aria-current={isCurrent && 'step'}
      {...rest}
    >
      <StepIcon state={state} size={iconSize}>
        {index}
      </StepIcon>
      <StepLabel state={state}>{children}</StepLabel>
    </div>
  );
};
