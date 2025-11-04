import { DateType } from '@leafygreen-ui/date-utils';

export interface DateInputBoxContextType {
  /**
   * Date value in UTC time
   */
  value?: DateType;
}

export interface DateInputBoxProviderProps {
  /**
   * Date value in UTC time
   */
  value?: DateType;
}
