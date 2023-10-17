import { HTMLElementProps } from '@leafygreen-ui/lib';

import { StepState } from '../Stepper';

export interface InternalStepProps extends HTMLElementProps<'div'> {
  state: StepState;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}
