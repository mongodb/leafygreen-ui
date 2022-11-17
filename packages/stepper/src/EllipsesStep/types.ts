import { StepStates } from '../types';
import { InternalStepProps } from '../InternalStep/types';

export type EllipsesStepProps = Omit<InternalStepProps, 'state'> & {
  startingStepIndex: number;
  state: StepStates.CompletedMultiple | StepStates.UpcomingMultiple;
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

export type EllipsesStepStates =
  | StepStates.CompletedMultiple
  | StepStates.UpcomingMultiple;
