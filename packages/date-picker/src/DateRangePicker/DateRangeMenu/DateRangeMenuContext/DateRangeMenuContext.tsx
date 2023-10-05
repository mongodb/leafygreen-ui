import React, { createContext, useContext } from 'react';

import { DynamicRefGetter } from '@leafygreen-ui/hooks';

export interface DateRangeMenuContextProps {
  /** The month displayed on the left */
  startMonth: Date;

  /** Setter for the start month */
  setStartMonth: React.Dispatch<React.SetStateAction<Date>>;

  /** A dynamic ref setter/getter for the start calendar cells */
  startCellRefs: DynamicRefGetter<HTMLTableCellElement>;

  /** The month displayed on the right */
  endMonth: Date;

  /** Setter for the end month */
  setEndMonth: React.Dispatch<React.SetStateAction<Date>>;

  /** A dynamic ref setter/getter for the end calendar cells */
  endCellRefs: DynamicRefGetter<HTMLTableCellElement>;

  /** Memoized reference for Date.now */
  today?: Date;
}

export const DateRangeMenuContext = createContext<DateRangeMenuContextProps>({
  startMonth: new Date(),
  setStartMonth: () => {},
  startCellRefs: (() => undefined) as DynamicRefGetter<HTMLTableCellElement>,
  endMonth: new Date(),
  setEndMonth: () => {},
  endCellRefs: (() => undefined) as DynamicRefGetter<HTMLTableCellElement>,
});

/** Hook to access {@link DateRangeMenuContextProps} */
export const useDateRangeMenuContext = () => useContext(DateRangeMenuContext);
