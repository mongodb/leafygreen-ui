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

  /**
   * An array of {@link Intl.DateTimeFormatPart},
   * used to determine the order of segments
   */
  formatParts?: Array<Intl.DateTimeFormatPart>;

  /** Identifies whether the component has been interacted with */
  isDirty: boolean;

  /** Setter for whether the component has been interacted with */
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}
