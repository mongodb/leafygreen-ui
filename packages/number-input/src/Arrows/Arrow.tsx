import React, { KeyboardEvent } from 'react';

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
  handleClick,
  handleArrowKeyDown,
  direction,
}: ArrowProps) => {
  const { theme } = useDarkMode();

  return (
    <button
      aria-label={`${direction} number`}
      onClick={() => handleClick(direction)}
      onKeyDown={handleArrowKeyDown}
      className={cx(arrowBaseStyles, arrowThemeStyles[theme])}
      type="button"
      tabIndex={-1} // Mimicking native behavior; you cannot focus on an arrow.
      disabled={disabled}
    >
      <Icon
        className={
          direction === Direction.Decrement ? downArrowRotateStyles : ''
        }
        aria-hidden={true}
        glyph="CaretUp"
        size={16}
      />
    </button>
  );
};

Arrow.displayName = 'Arrow';
