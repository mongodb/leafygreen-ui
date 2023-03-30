import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { Direction } from '../NumberInput/NumberInput.types';

import {
  arrowBaseStyles,
  arrowThemeStyles,
  downArrowRotateStyles,
} from './Arrows.styles';
import { ArrowProps } from './Arrows.types';

/**
 * @internal
 */

export const Arrow = ({
  disabled,
  onClick,
  onKeyDown,
  direction,
}: ArrowProps) => {
  const { theme } = useDarkMode();

  return (
    <button
      aria-label={`${direction} number`}
      onClick={() => onClick(direction)}
      onKeyDown={onKeyDown}
      className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
      type="button"
      tabIndex={-1} // Mimicking native behavior; you cannot focus on an arrow.
      disabled={disabled}
    >
      <Icon
        className={cx({
          [downArrowRotateStyles]: direction === Direction.Decrement,
        })}
        aria-hidden
        glyph="CaretUp"
        size={16}
      />
    </button>
  );
};

Arrow.displayName = 'Arrow';
