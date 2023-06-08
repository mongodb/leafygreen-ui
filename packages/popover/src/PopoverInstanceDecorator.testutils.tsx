import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { InstanceDecorator } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Align, Justify } from './types';

export const getJustify = (a: Align, j: Justify): string => {
  if (a === 'left' || a === 'right') {
    return a === 'right' ? 'start' : 'end';
  }

  return j === 'middle' || j === 'fit' ? 'center' : (j as string);
};

export const getAlign = (a: Align) => {
  return a === 'top' ? 'end' : a === 'bottom' ? 'start' : 'center';
};

/**
 * A convenience Storybook decorator
 * to appropriately align reference elements
 * for components using Popover
 */
export const PopoverInstanceDecorator: InstanceDecorator = (Instance, ctx) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refEl = React.useRef(null);
  return (
    <div
      className={css`
        height: 200px;
        width: 500px;
        display: flex;
        outline: 1px solid ${palette.gray.base}33;
        align-items: ${getAlign(ctx?.args.tooltipAlign)};
        justify-content: ${getJustify(
          ctx?.args.tooltipAlign,
          ctx?.args.tooltipJustify,
        )};
      `}
    >
      <div
        className={css`
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: 1px solid ${palette.gray.base};
        `}
        ref={refEl}
      >
        refEl
      </div>
      <Instance refEl={refEl} />
    </div>
  );
};
