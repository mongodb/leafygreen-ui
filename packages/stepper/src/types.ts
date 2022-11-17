export enum StepStates {
  CompletedMultiple = 'completed-multiple',
  Completed = 'completed',
  Current = 'current',
  Upcoming = 'upcoming',
  UpcomingMultiple = 'upcoming-multiple',
}

export type StepState = typeof StepStates[keyof typeof StepStates];

export type SingleStepStates =
  | StepStates.Completed
  | StepStates.Current
  | StepStates.Upcoming;
