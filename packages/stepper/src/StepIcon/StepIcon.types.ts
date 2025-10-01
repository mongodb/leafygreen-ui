import React from 'react';

import { StepState } from '../Stepper';

export interface StepIconProps extends React.ComponentPropsWithoutRef<'div'> {
  state: StepState;
  size?: number;
}
