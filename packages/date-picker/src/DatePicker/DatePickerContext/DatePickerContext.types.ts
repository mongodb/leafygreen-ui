import { SyntheticEvent } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { SegmentRefs } from '../../shared';
import { DatePickerProps } from '../DatePicker.types';

export interface DatePickerComponentRefs {
  segmentRefs: SegmentRefs;
  calendarCellRefs: DynamicRefGetter<HTMLTableCellElement>;
  calendarButtonRef: React.RefObject<HTMLButtonElement>;
  chevronButtonRefs: {
    left: React.RefObject<HTMLButtonElement>;
    right: React.RefObject<HTMLButtonElement>;
  };
}

export interface DatePickerContextProps {
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
   * Performs internal validation, and
   * calls the `handleValidation` function provided by the consumer
   */
  handleValidation: Required<DatePickerProps>['handleValidation'];

  /**
   * The current date, in the browser's time zone
   */
  today: Date;

  /**
   * The currently displayed month in the menu.
   */
  month: Date;

  /**
   * Sets the current month in the menu,
   * and performs any side-effects
   */
  setMonth: (newMonth: Date) => void;

  /**
   * The Date value for the calendar cell in the menu that has, or should have focus.
   */
  highlight: Date;

  /**
   * Sets the value of the calendar cell that should have focus,
   * and performs any side-effects
   */
  setHighlight: (newHighlight: Date) => void;

  /**
   * Opens the menu and handles side effects
   */
  openMenu: (triggerEvent?: SyntheticEvent) => void;

  /**
   * Closes the menu and handles side effects
   */
  closeMenu: (triggerEvent?: SyntheticEvent) => void;

  /**
   *  Toggles the menu and handles appropriate side effects
   */
  toggleMenu: (triggerEvent?: SyntheticEvent) => void;

  /** The event that triggered the last menu toggle  */
  menuTriggerEvent?: SyntheticEvent;

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
export interface DatePickerProviderProps {
  value: DateType | undefined;
  setValue: (newVal: DateType) => void;
  handleValidation?: DatePickerProps['handleValidation'];
}
