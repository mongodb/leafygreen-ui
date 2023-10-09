import React, { createContext, useContext } from 'react';

import { DynamicRefGetter } from '@leafygreen-ui/hooks';

export interface DateRangeMenuContextProps {
  /**
   * The month displayed on the left
   */
  month: Date;

  /**
   * Setter for the displayed month
   */
  setMonth: React.Dispatch<React.SetStateAction<Date>>;

  /**
   * The month displayed on the right
   */
  nextMonth: Date;

  /** A dynamic ref setter/getter for the start calendar cells */
  startCellRefs: DynamicRefGetter<HTMLTableCellElement>;

  /** A dynamic ref setter/getter for the end calendar cells */
  endCellRefs: DynamicRefGetter<HTMLTableCellElement>;

  /** Memoized reference for Date.now */
  today?: Date;
}

export const DateRangeMenuContext = createContext<DateRangeMenuContextProps>({
  month: new Date(),
  nextMonth: new Date(),
  setMonth: () => {},
  startCellRefs: (() => undefined) as DynamicRefGetter<HTMLTableCellElement>,
  endCellRefs: (() => undefined) as DynamicRefGetter<HTMLTableCellElement>,
});

/** Hook to access {@link DateRangeMenuContextProps} */
export const useDateRangeMenuContext = () => useContext(DateRangeMenuContext);
