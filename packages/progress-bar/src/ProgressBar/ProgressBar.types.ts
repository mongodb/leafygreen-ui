interface BaseProgressBarProps {}

interface DeterminateProgressBarProps extends BaseProgressBarProps {}
interface IndeterminateProgressBarProps extends BaseProgressBarProps {}

export type ProgressBarProps =
  | DeterminateProgressBarProps
  | IndeterminateProgressBarProps;
