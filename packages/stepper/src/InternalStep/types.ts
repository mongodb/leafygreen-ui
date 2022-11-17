import { HTMLElementProps } from '@leafygreen-ui/lib';
import { StepStates } from '../types';

export interface InternalStepProps extends HTMLElementProps<'div'> {
  state: StepStates;
  index?: number;
  stepIcon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
  shouldDisplayLine?: boolean;
}
