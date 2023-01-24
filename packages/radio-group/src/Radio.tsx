import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  containerMargin,
  hoverThemeStyles,
  inputBaseStyle,
  inputClassName,
  inputDisplayBaseStyle,
  inputDisplayClassName,
  inputDisplaySizeStyles,
  inputDisplayThemeStyles,
  inputDisplayWrapperClassName,
  inputThemeStyles,
  labelBaseStyle,
  labelThemeStyles,
  radioBoxBaseStyle,
  radioBoxSizeStyles,
} from './styles';
import { RadioProps, Size } from './types';

/**
 * # Radio
 *
 * Radio component
 *
 * ```
  <Radio value='radio-1'>Radio 1</Radio>
```
 * @param props.disabled Boolean that determines if the Radio is disabled.
 * @param props.children Content that will appear inside of Radio.
 * @param props.value Used to determine what Radio is active.
 * @param props.id Id for Radio and respective label.
 * @param props.default If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
 * @param props.className className supplied to Radio container.
 * @param props.size Size of Radio buttons.
 */
function Radio({
  children,
  className,
  onChange = () => {},
  value,
  disabled = false,
  id,
  name,
  darkMode: darkModeProp,
  checked,
  size = Size.Default,
  ...rest
}: RadioProps) {
  const normalizedSize =
    size === Size.Small || size === Size.XSmall ? Size.Small : Size.Default;
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={containerMargin}>
      <label
        htmlFor={id}
        className={cx(
          labelBaseStyle,
          labelThemeStyles[theme].base,
          {
            [labelThemeStyles[theme].disabled]: disabled,
            [css`
              font-size: 12px;
            `]: size === Size.XSmall, // TODO: keeping this style until XS is deprecated
          },
          className,
        )}
      >
        <input
          {...rest}
          checked={!!checked}
          id={id}
          name={name}
          type="radio"
          onChange={onChange}
          value={value}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={cx(
            inputClassName,
            inputBaseStyle,
            inputThemeStyles[theme],
          )}
        />

        <div
          className={cx(
            radioBoxBaseStyle,
            radioBoxSizeStyles[normalizedSize],
            {
              [css`
                margin-top: 3px;
                margin-right: 4px;
              `]: size === Size.XSmall, // TODO: keeping this style until XS is deprecated
              [hoverThemeStyles[theme]]: !disabled,
            },
            inputDisplayWrapperClassName,
          )}
        >
          <div
            className={cx(
              inputDisplayClassName,
              inputDisplayBaseStyle,
              inputDisplayThemeStyles[theme],
              inputDisplaySizeStyles[normalizedSize],
            )}
          />
        </div>

        <div>{children}</div>
      </label>
    </div>
  );
}

Radio.displayName = 'Radio';

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  default: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default Radio;
