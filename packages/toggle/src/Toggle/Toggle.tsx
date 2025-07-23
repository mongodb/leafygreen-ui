import React, { useCallback, useState } from 'react';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonThemeStyles,
  checkmarkBaseStyles,
  checkmarkSize,
  checkmarkThemeStyles,
  sliderBaseStyles,
  sliderSizeStyles,
  sliderThemeStyles,
  toggleButtonClassName,
} from './styles';
import { Size, ToggleProps } from './types';

/**
 * A Toggle component is used to switch between two binary states, like on and off, and will take an immediate effect when selected.
 */
function Toggle({
  className,
  size = Size.Default,
  darkMode: darkModeProp,
  disabled = false,
  onChange: onChangeProp,
  onClick: onClickProp,
  checked: controlledChecked,
  'data-lgid': dataLgId,
  ...rest
}: ToggleProps) {
  validateAriaLabelProps(rest, Toggle.displayName);
  const { theme } = useDarkMode(darkModeProp);
  const [checked, setChecked] = useState(false);
  const lgIds = getLgIds(dataLgId);

  const isControlled = typeof controlledChecked === 'boolean';
  const normalizedChecked = controlledChecked ?? checked;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onClickProp?.(e);

      if (isControlled) {
        onChangeProp?.(!controlledChecked, e);
      } else {
        setChecked(curr => {
          const updatedState = !curr;
          onChangeProp?.(updatedState, e);
          return updatedState;
        });
      }
    },
    [isControlled, controlledChecked, onClickProp, onChangeProp],
  );

  return (
    <button
      role="switch"
      type="button"
      onClick={onClick}
      aria-checked={normalizedChecked}
      disabled={disabled}
      aria-disabled={disabled}
      className={cx(
        className,
        toggleButtonClassName,
        buttonBaseStyles,
        buttonThemeStyles[theme],
        buttonSizeStyles[size],
      )}
      data-lgid={lgIds.root}
      data-testid={lgIds.root}
      {...rest}
    >
      <div
        className={cx(
          sliderBaseStyles,
          sliderSizeStyles[size],
          sliderThemeStyles[theme],
        )}
      >
        {size !== Size.XSmall && (
          <CheckmarkIcon
            aria-hidden={true}
            className={cx(checkmarkBaseStyles, checkmarkThemeStyles[theme])}
            size={checkmarkSize[size]}
          />
        )}
      </div>
    </button>
  );
}

Toggle.displayName = 'Toggle';

export default Toggle;
