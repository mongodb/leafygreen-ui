import { SegmentRefs } from '@leafygreen-ui/date-picker/shared/hooks';
import {
  DateRangeType,
  DateType,
} from '@leafygreen-ui/date-picker/shared/types';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { DateRangePickerProps } from '../DateRangePicker.types';

export interface DateRangeComponentRefs {
  formFieldRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  startSegmentRefs: SegmentRefs;
  endSegmentRefs: SegmentRefs;
  calendarSectionRef: React.RefObject<HTMLDivElement>;
  chevronRefs: DynamicRefGetter<HTMLButtonElement>;
  calendarCellRefs: DynamicRefGetter<HTMLTableCellElement>;
  footerButtonRefs: DynamicRefGetter<HTMLButtonElement>;
  selectRefs: DynamicRefGetter<HTMLDivElement>;
  quickRangeButtonRefs: DynamicRefGetter<HTMLButtonElement>;
}

export interface DateRangeContextProps {
  refs: DateRangeComponentRefs;
  value: DateRangeType | undefined;
  setValue: (newVal: DateRangeType | undefined) => void;
  handleValidation: DateRangePickerProps['handleValidation'];
  today: Date;
  month: Date;
  nextMonth: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  highlight: DateType;
  setHighlight: React.Dispatch<React.SetStateAction<DateType>>;
  getHighlightedCell: () => HTMLTableCellElement | null | undefined;
}

export interface DateRangeProviderProps {
  rootRef: React.ForwardedRef<HTMLDivElement | null>;
  value: DateRangeType | undefined;
  setValue: (newVal: DateRangeType | undefined) => void;
  handleValidation: DateRangePickerProps['handleValidation'];
}
