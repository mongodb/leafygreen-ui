import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Description, Label } from '@leafygreen-ui/typography';

import { Size } from '../types';

import {
  containerSizeStyle,
  containerStyle,
  descriptionStyles,
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
  radioBoxBaseStyle,
  radioBoxSizeStyles,
} from './Radio.styles';
import { RadioProps } from './Radio.types';

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
  description,
  ...rest
}: RadioProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const normalizedSize =
    size === Size.Small || size === Size.XSmall ? Size.Small : Size.Default;
  const { theme } = useDarkMode(darkModeProp);
  const descriptionId = useIdAllocator({});

  return (
    <div className={cx(containerStyle, containerSizeStyle[normalizedSize])}>
      <Label
        disabled={disabled}
        darkMode={darkMode}
        htmlFor={id!}
        className={cx(
          labelBaseStyle,
          {
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
          aria-describedby={descriptionId}
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

        <>{children}</>
      </Label>

      {description && (
        <Description id={descriptionId} className={descriptionStyles}>
          {description}
        </Description>
      )}
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
  description: PropTypes.string,
};

export default Radio;
