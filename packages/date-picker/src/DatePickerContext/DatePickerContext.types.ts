import { BaseDatePickerProps } from '../types';

/** The props expected to pass int the provider */
export interface DatePickerProviderProps extends BaseDatePickerProps {
  /** Whether the calendar menu is open */
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuId: string;
}

/**
 * The values in context
 */
export interface DatePickerContextProps
  extends Required<DatePickerProviderProps> {
  /** The earliest date accepted */
  min: Date;

  /** The latest date accepted */
  max: Date;

  /**
   * Returns whether the given date is within the component's min/max dates
   */
  isInRange: (d?: Date | null) => boolean;

  formatParts?: Array<Intl.DateTimeFormatPart>;
}
