import React, { PropsWithChildren, useMemo, useState } from 'react';

import { getFirstOfMonth, setToUTCMidnight } from '../../../utils';
import { addMonthsUTC } from '../../../utils';
import { DateRangeMenuProps } from '../DateRangeMenu.types';

import { DateRangeMenuContext } from './DateRangeMenuContext';

export interface DateRangeMenuProviderProps
  extends Pick<DateRangeMenuProps, 'value'>,
    PropsWithChildren<{}> {
  today: Date;
}

/**
 * Receives the start & end dates
 * and initializes the start & end display months
 */
export const DateRangeMenuProvider = ({
  value,
  today,
  children,
}: DateRangeMenuProviderProps) => {
  const [month, setMonth] = useState<Date>(
    getFirstOfMonth(value?.[0] ?? today),
  );
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
