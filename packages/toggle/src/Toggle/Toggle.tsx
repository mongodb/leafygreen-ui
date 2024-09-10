import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS_TOGGLE } from '../constants';

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

function Toggle({
  className,
  size = Size.Default,
  darkMode: darkModeProp,
  disabled = false,
  onChange: onChangeProp,
  onClick: onClickProp,
  checked: controlledChecked,
  'data-lgid': dataLgId = LGIDS_TOGGLE.root,
  ...rest
}: ToggleProps) {
  validateAriaLabelProps(rest, Toggle.displayName);
  const { theme } = useDarkMode(darkModeProp);
  const [checked, setChecked] = useState(false);

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
      data-lgid={dataLgId}
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

Toggle.propTypes = {
  size: PropTypes.oneOf(Object.values(Size)),
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Toggle;
