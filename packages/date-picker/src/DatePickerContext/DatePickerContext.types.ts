import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { BaseDatePickerProps } from '../types';

/** The props expected by the provider */
export interface DatePickerProviderProps extends BaseDatePickerProps {
  /** Whether the calendar menu is open */
  isOpen: boolean;
  menuId: string;
  segmentRefs: ReturnType<typeof useDynamicRefs<HTMLInputElement>>;
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
}
