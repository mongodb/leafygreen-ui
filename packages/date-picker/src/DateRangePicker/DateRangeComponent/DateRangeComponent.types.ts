import { DateRangeType } from '../DateRangePicker.types';

export interface DateRangeComponentProps {
  range?: DateRangeType;
  setRange: (newVal?: DateRangeType | undefined) => void;
}
