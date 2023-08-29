import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DateInputBoxProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Date value passed into the component.
   * Date object is relative to the client's time zone
   */
  value: Date | null;

  /**
   * Value setter callback.
   * Date object is relative to the client's time zone
   */
  setValue?: (date: Date | null) => void;
}

export interface DateSegmentsState {
  day?: number;
  month?: number;
  year?: number;
}
