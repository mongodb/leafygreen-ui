import { css } from '@leafygreen-ui/emotion';
import { Size } from '@leafygreen-ui/tokens';

import { getLockupGap } from './constants';
import { Direction } from './Lockup.types';

interface LockupStyleArgs {
  direction: Direction;
  size: Size | number;
}

export const getLockupStyles = ({ direction, size }: LockupStyleArgs) => {
  const flexDirection = direction === 'horizontal' ? 'row' : 'column';

  return css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: center;
    gap: ${getLockupGap(direction, size)}px;
  `;
};
