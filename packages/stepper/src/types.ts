export const StepStates = {
  CompletedMultiple: 'completed-multiple',
  Completed: 'completed',
  Current: 'current',
  Upcoming: 'upcoming',
  UpcomingMultiple: 'upcoming-multiple',
};

export type StepState = (typeof StepStates)[keyof typeof StepStates];
