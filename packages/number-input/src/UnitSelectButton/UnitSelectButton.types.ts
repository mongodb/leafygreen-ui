import { BaseButtonProps } from '@leafygreen-ui/button';

import { UnitSelectProps } from '../UnitSelect/UnitSelect.types';

export type UnitSelectButtonProps = {
  /**
   * Determines if the dropdown is disabled.
   */
  disabled?: UnitSelectProps['disabled'];

  /**
   * The select option that is shown in the select menu button.
   */
  displayName?: string;
} & BaseButtonProps;
