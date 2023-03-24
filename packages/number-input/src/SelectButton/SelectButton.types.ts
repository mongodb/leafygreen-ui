import { ButtonProps } from '@leafygreen-ui/button';

import { PopoverProps } from '../Select/Select.types';

export interface SelectButtonProps extends ButtonProps, PopoverProps {
  disabled: boolean;
  displayName: string;
}
