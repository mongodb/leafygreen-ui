import { DateRangeType } from '../../types';
import { DateRangePickerProps } from '../DateRangePicker.types';

export interface DateRangeComponentProps
  extends Pick<DateRangePickerProps, 'showQuickSelection'> {
  range?: DateRangeType;
  setRange: (newVal?: DateRangeType | undefined) => void;
}
