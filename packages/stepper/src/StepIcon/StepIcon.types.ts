import React from 'react';

import { StepState } from '../Stepper';

export interface StepIconProps extends React.ComponentPropsWithRef<'div'> {
  state: StepState;
  size?: number;
}
