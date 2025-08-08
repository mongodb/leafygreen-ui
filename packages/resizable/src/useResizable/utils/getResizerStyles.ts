import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { RESIZER_SIZE } from '../useResizable.constants';

/**
 * Generates styles for the resizer element based on its orientation and resizing state
 */
export const getResizerStyles = (isVertical: boolean, isResizing: boolean) =>
  cx(
    css`
      cursor: ${isVertical ? 'col-resize' : 'row-resize'};
      background-color: transparent;

      &:hover,
      &:focus-visible {
        background-color: ${palette.blue.light1};
        outline: none;
      }
    `,
    {
      [css`
        width: ${RESIZER_SIZE}px;
        height: 100%;
      `]: isVertical,
      [css`
        height: ${RESIZER_SIZE}px;
        width: 100%;
      `]: !isVertical,
      [css`
        background-color: ${palette.blue.light1};
      `]: isResizing,
    },
  );
