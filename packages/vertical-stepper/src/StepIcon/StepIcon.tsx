import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
// @ts-expect-error - Could not find a declaration file
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  getStepWrapperStyles,
  getThemedStateStyles,
  stepIconClassName,
  stepStyles,
} from './StepIcon.styles';
import { StepIconProps } from './StepIcon.types';

/**
 *
 * @internal
 */
export const StepIcon = ({ isCompleted, state, index }: StepIconProps) => {
  const { theme } = useDarkMode();

  return (
    <div className={cx(stepIconClassName, getStepWrapperStyles(isCompleted))}>
      <div className={cx(stepStyles, getThemedStateStyles(theme, state))}>
        {isCompleted ? <CheckmarkIcon /> : index + 1}
      </div>
    </div>
  );
};

StepIcon.displayName = 'StepIcon';
