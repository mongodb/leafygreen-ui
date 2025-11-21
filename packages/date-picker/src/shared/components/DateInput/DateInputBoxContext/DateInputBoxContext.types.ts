import { PropsWithChildren } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

export interface DateInputBoxContextType {
  /**
   * Date value in UTC time
   */
  dateValue?: DateType;
}

export interface DateInputBoxProviderProps
  extends PropsWithChildren<DateInputBoxContextType> {}
