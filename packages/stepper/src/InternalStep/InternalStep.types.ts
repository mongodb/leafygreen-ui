import { HTMLElementProps } from '@leafygreen-ui/lib';

import { StepState } from '../Stepper/Stepper.types';

export interface InternalStepProps extends HTMLElementProps<'div'> {
  state: StepState;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}
