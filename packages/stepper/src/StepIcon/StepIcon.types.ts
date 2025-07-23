import { HTMLElementProps } from '@leafygreen-ui/lib';

import { StepState } from '../Stepper';

export interface StepIconProps extends HTMLElementProps<'div'> {
  state: StepState;
  size?: number;
}
