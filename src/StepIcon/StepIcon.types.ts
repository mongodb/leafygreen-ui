import { InternalVerticalStepProps } from '../VerticalStep';

export type StepIconProps = Pick<
  InternalVerticalStepProps,
  'index' | 'state'
> & {
  /**
   * Whether the step is completed
   */
  isCompleted: boolean;
};
