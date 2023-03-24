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
  handleValueChange,
  direction,
}: ArrowProps) => {
  const { theme } = useDarkMode();

  /**
   * Edge case if the user clicks on an arrow button then switches to keyboard click.
   * By default if focus is in the input then the keyboard clicks will work automatically but since the buttons are custom and outside of the input we are mimicking native behavior.
   */
  const handleArrowKeyDown = (e: KeyboardEvent) => {
    if (!disabled) {
      switch (e.key) {
        case 'ArrowUp': {
          e.preventDefault();
          handleValueChange(Direction.Increment);
          break;
        }

        case 'ArrowDown': {
          e.preventDefault();
          handleValueChange(Direction.Decrement);
          break;
        }
      }
    }
  };

  return (
    <button
      aria-label={`${direction} number`}
      onClick={() => handleValueChange(direction)}
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
