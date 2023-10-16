import React, { PropsWithChildren, useMemo } from 'react';

import { addMonthsUTC } from '../../../utils';
import { DateRangeMenuProps } from '../DateRangeMenu.types';

import { DateRangeMenuContext } from './DateRangeMenuContext';

export interface DateRangeMenuProviderProps
  extends Pick<DateRangeMenuProps, 'value'>,
    PropsWithChildren<{}> {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  today: Date;
}

/**
 * Receives the start & end dates
 * and initializes the start & end display months
 */
export const DateRangeMenuProvider = ({
  month,
  setMonth,
  today,
  children,
}: DateRangeMenuProviderProps) => {
  const nextMonth = useMemo<Date>(() => addMonthsUTC(month, 1), [month]);

  return (
    <DateRangeMenuContext.Provider
      value={{
        month,
        nextMonth,
        setMonth,
        today,
      }}
    >
      {children}
    </DateRangeMenuContext.Provider>
  );
};
