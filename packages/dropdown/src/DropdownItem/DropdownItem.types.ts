import { ActionType } from '@leafygreen-ui/input-option';

import { BaseItemProps } from '../types';

export type DropdownItemProps = BaseItemProps & {
  /**
   * Styles input based on intended action
   * @default 'default'
   */
  actionType?: ActionType;
};
