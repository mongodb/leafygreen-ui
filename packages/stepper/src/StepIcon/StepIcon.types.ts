import { StepState } from 'src/Stepper/Stepper.types';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface StepIconProps extends HTMLElementProps<'div'> {
  state: StepState;
  size?: number;
}
