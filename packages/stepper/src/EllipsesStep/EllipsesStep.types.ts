import { DarkModeProps } from '@leafygreen-ui/lib';

import { InternalStepProps } from '../InternalStep';
import { StepStates } from '../Stepper';

export const EllipsesStepStates = {
  CompletedMultiple: StepStates.CompletedMultiple,
  UpcomingMultiple: StepStates.UpcomingMultiple,
} as const;

export type EllipsesStepState =
  (typeof EllipsesStepStates)[keyof typeof EllipsesStepStates];

export type EllipsesStepProps = Omit<InternalStepProps, 'state'> &
  DarkModeProps & {
    startingStepIndex: number;
    state: EllipsesStepState;
    tooltipContent: Array<
      React.ReactChild | React.ReactFragment | React.ReactPortal
    >;
  };
