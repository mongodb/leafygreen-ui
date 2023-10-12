import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { DateType } from '../../../types';
import { DateRangeMenuProps } from '../DateRangeMenu.types';

export interface DateRangeMenuCalendarsProps
  extends Pick<DateRangeMenuProps, 'value' | 'setValue'> {
  highlight: DateType;
  setHighlight: React.Dispatch<React.SetStateAction<DateType>>;
  cellRefs: DynamicRefGetter<HTMLTableCellElement>;
  chevronRefs: DynamicRefGetter<HTMLButtonElement>;
}
