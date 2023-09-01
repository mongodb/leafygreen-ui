import { BaseDatePickerProps } from 'src/types';

export interface DatePickerContextProps extends Required<BaseDatePickerProps> {
  /** The earliest date accepted */
  min: Date;

  /** The latest date accepted */
  max: Date;

  isInRange: (d?: Date | null) => boolean;
}
