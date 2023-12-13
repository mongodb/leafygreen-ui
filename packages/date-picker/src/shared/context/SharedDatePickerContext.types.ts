import { BaseDatePickerProps, DatePickerState } from '../types';

import { UseDatePickerErrorNotificationsReturnObject } from './useDatePickerErrorNotifications';

export interface StateNotification {
  state: DatePickerState;
  message: string;
}

/** The props expected to pass int the provider */
export interface SharedDatePickerProviderProps extends BaseDatePickerProps {}

/**
 * The values in context
 */
export interface SharedDatePickerContextProps
  extends Omit<Required<SharedDatePickerProviderProps>, 'state'>,
    UseDatePickerErrorNotificationsReturnObject {
  /** The earliest date accepted */
  min: Date;

  /** The latest date accepted */
  max: Date;

  /**
   * Returns whether the given date is within the component's min/max dates
   */
  isInRange: (d?: Date | null) => boolean;

  /**
   * An array of {@link Intl.DateTimeFormatPart},
   * used to determine the order of segments
   */
  formatParts?: Array<Intl.DateTimeFormatPart>;

  /** a unique id for the menu element */
  menuId: string;

  /** Whether the menu is open */
  isOpen: boolean;

  /**
   * Setter to open or close the menu
   * @internal - Prefer using `open/close/toggleMenu`
   * from single/range component context
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /** Identifies whether the component has been interacted with */
  isDirty: boolean;

  /** Setter for whether the component has been interacted with */
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;

  /** Identifies whether the select menus are open inside the menu */
  isSelectOpen: boolean;

  /** Setter for whether the select menus are open inside the menu */
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
