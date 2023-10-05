import { DateRangePickerProps, DateRangeType } from '../DateRangePicker.types';

export interface DateRangeComponentProps
  extends Pick<DateRangePickerProps, 'showQuickSelection'> {
  range?: DateRangeType;
  setRange: (newVal?: DateRangeType | undefined) => void;
}
