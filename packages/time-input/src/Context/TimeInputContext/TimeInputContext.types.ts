import { DateType } from '@leafygreen-ui/date-utils';

import { TimeInputProps } from '../../TimeInput/TimeInput.types';

/**
 * Context props for the time input
 */
export interface TimeInputContextProps {
  /** The current value of the time input */
  value: DateType | undefined;

  /**
   * Dispatches a setter for the time input value.
   * Performs common side-effects
   */
  setValue: (newVal: DateType | undefined) => void;

  /**
   * Performs internal validation, and
   * calls the `handleValidation` function provided by the consumer
   */
  handleValidation: Required<TimeInputProps>['handleValidation'];
}

/**
 * Props passed into the provider component
 */
export interface TimeInputProviderProps {
  value: DateType | undefined;
  setValue: (newVal: DateType | undefined) => void;
  handleValidation?: TimeInputProps['handleValidation'];
}
