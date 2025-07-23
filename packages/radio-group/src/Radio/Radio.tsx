import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Description, Label } from '@leafygreen-ui/typography';

import { Size } from '../types';

import {
  containerSizeStyle,
  containerStyle,
  descriptionStyles,
  disabledStyle,
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
  labelWeightStyle,
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
  bold,
  ...rest
}: RadioProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const normalizedSize =
    size === Size.Small || size === Size.XSmall ? Size.Small : Size.Default;
  const { theme } = useDarkMode(darkModeProp);
  const descriptionId = useIdAllocator({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e);
    }
  };

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
            [labelWeightStyle]: !bold,
            [disabledStyle]: disabled,
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
          onChange={handleChange}
          value={value}
          aria-checked={checked}
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
        <Description
          id={descriptionId}
          className={cx(descriptionStyles, { [disabledStyle]: disabled })}
        >
          {description}
        </Description>
      )}
    </div>
  );
}

Radio.displayName = 'Radio';

export default Radio;
