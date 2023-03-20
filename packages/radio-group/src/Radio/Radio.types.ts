import { HTMLElementProps } from '@leafygreen-ui/lib';

import { RadioGroupProps } from '..';

export interface RadioProps
  extends Omit<HTMLElementProps<'input'>, 'size'>,
    Pick<RadioGroupProps, 'darkMode' | 'size'> {
  /**
   * Used to determine what Radio is active.
   */
  value: string | number;
  /**
   * If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
   */
  default?: boolean;

  /**
   * Boolean that determines if the Radio is disabled.
   */
  disabled?: boolean;
  /**
   * Content that will appear inside of Radio.
   */
  children?: React.ReactNode;

  /**
   * Description text rendered under the label.
   */
  description?: string;
}
