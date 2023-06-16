import { ButtonProps } from '@leafygreen-ui/button';

import { PopoverProps, UnitSelectProps } from '../UnitSelect/UnitSelect.types';

export interface UnitSelectButtonProps extends ButtonProps, PopoverProps {
  /**
   * Determines if the dropdown is disabled.
   */
  disabled: UnitSelectProps['disabled'];

  /**
   * The select option that is shown in the select menu button.
   */
  displayName: string;
}
