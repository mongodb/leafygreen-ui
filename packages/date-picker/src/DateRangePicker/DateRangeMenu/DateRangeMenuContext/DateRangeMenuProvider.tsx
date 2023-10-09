import React, { PropsWithChildren, useMemo, useState } from 'react';
import { addMonths } from 'date-fns';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { getFirstOfMonth, setToUTCMidnight } from '../../../utils';
import { addMonthsUTC } from '../../../utils';
import { DateRangeMenuProps } from '../DateRangeMenu.types';

import { DateRangeMenuContext } from './DateRangeMenuContext';

export interface DateRangeMenuProviderProps
  extends Pick<DateRangeMenuProps, 'value'>,
    PropsWithChildren<{}> {}

/**
 * Receives the start & end dates
 * and initializes the start & end display months
 */
export const DateRangeMenuProvider = ({
  value,
  children,
}: DateRangeMenuProviderProps) => {
  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);

  const [month, setMonth] = useState<Date>(
    getFirstOfMonth(value?.[0] ?? today),
  );
  const nextMonth = useMemo<Date>(() => addMonthsUTC(month, 1), [month]);

  const startCellRefs = useDynamicRefs<HTMLTableCellElement>();
  const endCellRefs = useDynamicRefs<HTMLTableCellElement>();

  return (
    <DateRangeMenuContext.Provider
      value={{
        month,
        nextMonth,
        setMonth,
        startCellRefs,
        endCellRefs,
        today,
      }}
    >
      {children}
    </DateRangeMenuContext.Provider>
  );
};
