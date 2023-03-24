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

export const Arrows = ({ disabled, handleValueChange }: ArrowsProps) => {
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
        handleValueChange={handleValueChange}
      />
      <Arrow
        disabled={disabled}
        direction={Direction.Decrement}
        handleValueChange={handleValueChange}
      />
    </div>
  );
};

Arrows.displayName = 'Arrows';
