import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size, ToggleProps } from './types';
import {
  buttonBaseStyles,
  checkmarkBaseStyles,
  sliderBaseStyles,
  checkmarkModeStyles,
  checkmarkSize,
  themeStyles,
  sizeStyles,
  toggleButtonClassName,
} from './styles';

function Toggle({
  className,
  size = Size.Default,
  darkMode: darkModeProp,
  disabled = false,
  onChange: onChangeProp,
  onClick: onClickProp,
  checked: controlledChecked,
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

  const { button: buttonModeStyles, slider: sliderModeStyles } =
    themeStyles[theme];

  const { button: buttonSizeStyles, slider: sliderSizeStyles } =
    sizeStyles[size];

  return (
    <button
      role="switch"
      type="button"
      onClick={onClick}
      aria-checked={normalizedChecked}
      disabled={disabled}
      aria-disabled={disabled}
      className={cx(
        toggleButtonClassName,
        buttonBaseStyles,
        buttonModeStyles,
        buttonSizeStyles,
      )}
      {...rest}
    >
      <div className={cx(sliderBaseStyles, sliderSizeStyles, sliderModeStyles)}>
        {size !== Size.XSmall && (
          <CheckmarkIcon
            aria-hidden={true}
            className={cx(checkmarkBaseStyles, checkmarkModeStyles[theme])}
            size={checkmarkSize[size]}
          />
        )}
      </div>
    </button>
  );
}

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'xsmall']),
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Toggle;
