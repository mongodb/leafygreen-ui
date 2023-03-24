import { ButtonProps } from '@leafygreen-ui/button';

import { PopoverProps, SelectProps } from '../Select/Select.types';

export interface SelectButtonProps extends ButtonProps, PopoverProps {
  disabled: SelectProps['disabled'];

  /**
   * The select option that is shown in the select menu button.
   */
  displayName: string;
}
