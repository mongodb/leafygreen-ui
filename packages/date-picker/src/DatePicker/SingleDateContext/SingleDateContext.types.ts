import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { DateType, SegmentRefs } from '../../shared';
import { DatePickerProps } from '../DatePicker.types';

export interface DatePickerComponentRefs {
  segmentRefs: SegmentRefs;
  calendarCellRefs: DynamicRefGetter<HTMLTableCellElement>;
  calendarButtonRef: React.RefObject<HTMLButtonElement>;
}

export interface SingleDateContextProps {
  /**
   * Ref objects for important date picker elements
   */
  refs: DatePickerComponentRefs;

  /** The current value of the date picker */
  value: DateType | undefined;

  /**
   * Dispatches a setter for the date picker value.
   * Performs common side-effects
   */
  setValue: (newVal: DateType | undefined) => void;

  /**
   * Calls the `handleValidation` function provided by the consumer
   */
  handleValidation: DatePickerProps['handleValidation'];

  /**
   * The current date, at UTC midnight
   */
  today: Date;

  /**
   * The currently displayed month in the menu
   */
  month: Date;

  /**
   * Sets the current month in the menu,
   * and performs any side-effects
   */
  setMonth: (newMonth: Date) => void;

  /**
   * The Date value for the calendar cell in the menu that has, or should have focus
   */
  highlight: DateType;

  /**
   * Sets the value of the calendar cell that should have focus,
   * and performs any side-effects
   */
  setHighlight: (newHighlight: DateType) => void;

  /**
   * Returns the calendar cell element that has, or should have focus
   */
  getHighlightedCell: () => HTMLTableCellElement | null | undefined;

  /**
   * Returns the calendar cell with the provided value
   */
  getCellWithValue: (date: DateType) => HTMLTableCellElement | null | undefined;
}

/** Props passed into the provider component */
export interface SingleDateProviderProps {
  value: DateType | undefined;
  setValue: (newVal: DateType) => void;
  handleValidation?: DatePickerProps['handleValidation'];
}
