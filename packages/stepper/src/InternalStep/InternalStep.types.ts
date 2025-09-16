import React from 'react';

import { StepState } from '../Stepper';

export interface InternalStepProps
  extends React.ComponentPropsWithoutRef<'div'> {
  state: StepState;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}
