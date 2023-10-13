import React, { createContext, useContext } from 'react';

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

  /** Memoized reference for Date.now */
  today: Date;
}

export const DateRangeMenuContext = createContext<DateRangeMenuContextProps>({
  month: new Date(),
  nextMonth: new Date(),
  setMonth: () => {},
  today: new Date(),
});

/** Hook to access {@link DateRangeMenuContextProps} */
export const useDateRangeMenuContext = () => useContext(DateRangeMenuContext);
