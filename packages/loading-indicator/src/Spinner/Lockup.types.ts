import { ComponentProps } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type Direction = 'horizontal' | 'vertical';

export interface SpinnerLockupProps
  extends DarkModeProps,
    ComponentProps<'div'> {
  direction?: Direction;
}
