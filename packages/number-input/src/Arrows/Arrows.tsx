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
  onClick,
  onKeyDown,
  onBlur,
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
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <Arrow
        disabled={disabled}
        direction={Direction.Decrement}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </div>
  );
};

Arrows.displayName = 'Arrows';
