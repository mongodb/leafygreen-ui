import { ActionType } from '@leafygreen-ui/input-option';

import { BaseItemProps } from '../types';

export type DropdownItemProps = BaseItemProps & { actionType?: ActionType };
