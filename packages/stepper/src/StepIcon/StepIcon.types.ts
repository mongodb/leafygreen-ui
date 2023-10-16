import { HTMLElementProps } from '@leafygreen-ui/lib';

import { StepState } from '../Stepper/Stepper.types';

export interface StepIconProps extends HTMLElementProps<'div'> {
  state: StepState;
  size?: number;
}
