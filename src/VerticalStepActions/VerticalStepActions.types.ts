import { InternalVerticalStepProps } from '../VerticalStep/VerticalStep.types';

export type VerticalStepActionsProps = Pick<
  InternalVerticalStepProps,
  'actions' | 'state'
>;
