import { InternalVerticalStepProps } from '../VerticalStep/VerticalStep.types';

export type VerticalStepperButtonProps = Pick<
  InternalVerticalStepProps,
  'primaryButtonProps' | 'secondaryButtonProps' | 'state'
>;
