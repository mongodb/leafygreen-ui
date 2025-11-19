import { DateType } from '@leafygreen-ui/date-utils';
import { PropsWithChildren } from 'react';

export interface DateInputBoxContextType {
  /**
   * Date value in UTC time
   */
  value?: DateType;
}

export interface DateInputBoxProviderProps
  extends PropsWithChildren<DateInputBoxContextType> {}
