import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import { PropsWithChildren } from 'react';
import { StepLabelProps } from './types';
import { StepStates } from '../types';
import { cx } from '@leafygreen-ui/emotion';
import { useStepperContext } from '../StepperContext';
import { stepLabelClassName } from '../constants';
import { styles } from './styles';

const StepLabel = ({ children, state }: PropsWithChildren<StepLabelProps>) => {
  const isCurrent = state === StepStates.Current;
  const { darkMode } = useStepperContext();

  return (
    <Body
      className={cx(styles(darkMode)[state], stepLabelClassName)}
      weight={isCurrent ? 'medium' : 'regular'}
    >
      {children}
    </Body>
  );
};

export default StepLabel;
