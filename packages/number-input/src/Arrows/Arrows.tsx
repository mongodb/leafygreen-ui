import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { Direction } from '../NumberInput/NumberInput.types';

import { Arrow } from './Arrow';
import {
  arrowDisabledStyles,
  arrowsAnimateStyles,
  arrowsBaseStyles,
} from './Arrows.styles';
import { ArrowsProps } from './Arrows.types';

/**
 * @internal
 */

export const Arrows = ({
  disabled,
  handleClick,
  handleArrowKeyDown,
}: ArrowsProps) => {
  return (
    <div
      className={cx(arrowsBaseStyles, {
        [arrowsAnimateStyles]: !disabled,
        [arrowDisabledStyles]: disabled,
      })}
    >
      <Arrow
        disabled={disabled}
        direction={Direction.Increment}
        handleClick={handleClick}
        handleArrowKeyDown={handleArrowKeyDown}
      />
      <Arrow
        disabled={disabled}
        direction={Direction.Decrement}
        handleClick={handleClick}
        handleArrowKeyDown={handleArrowKeyDown}
      />
    </div>
  );
};

Arrows.displayName = 'Arrows';
