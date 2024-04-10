import { State } from '../Select/Select.types';

export interface StateFeedbackProps {
  disabled: boolean;
  errorMessage: string;
  hideFeedback: boolean;
  state: State;
  successMessage: string;
}
