import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DateInputBoxProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Date value passed into the component, in UTC time
   */
  value: Date | null;

  /**
   * Value setter callback.
   * Date object is in UTC time
   */
  setValue?: (date: Date | null) => void;

  /**
   * id of the labelling element
   */
  labelledBy?: string;
}
