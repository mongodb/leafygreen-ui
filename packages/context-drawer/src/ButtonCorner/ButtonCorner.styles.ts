import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

import { Side } from './ButtonCorner.types';

const CORNER_SIZE = 8;
const CORNER_OFFSET = 15;

const baseWrapperStyles = css`
  display: flex;
  position: absolute;
  top: 0;
  width: ${CORNER_SIZE}px;
  height: ${CORNER_SIZE}px;
`;

export const getWrapperStyles = (side: Side) =>
  cx(baseWrapperStyles, {
    [css`
      left: -${CORNER_OFFSET}px;
    `]: side === Side.Left,
    [css`
      right: -${CORNER_OFFSET}px;
      transform: scaleX(-1);
    `]: side === Side.Right,
  });

export const getFill = (theme: Theme) => color[theme].background.info.default;
