import React from 'react';
import PropTypes from 'prop-types';
import { Description, Label } from '@leafygreen-ui/typography';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { Check } from './Check';
import { CheckboxProps } from './types';
import {
  checkWrapperClassName,
  containerStyle,
  descriptionStyle,
  disabledContainerStyle,
  disabledLabelDarkThemeOverrideStyle,
  inputClassName,
  inputFocusStyles,
  inputStyle,
  labelHoverStyle,
  labelStyle,
  labelTextStyle,
} from './Checkbox.style';

/**
 * Checkboxes should be used whenever a user has an option they’d like to opt in or out of.
 *
 * Unlike toggles, checkboxes are used for actions, or features, that don’t immediately turn on or off. Checkboxes are usually found in forms as opposed to config pages.
 */
function Checkbox({
  darkMode = false,
  checked: checkedProp,
  label = '',
  description,
  disabled = false,
  bold: boldProp,
  indeterminate: indeterminateProp,
  animate = true,
  className,
  onClick: onClickProp,
  onChange: onChangeProp,
  id: idProp,
  style,
  name,
  ...rest
}: CheckboxProps) {
  const [checked, setChecked] = React.useState(false);
  const isChecked = React.useMemo(
    () => (checkedProp != null ? checkedProp : checked),
    [checkedProp, checked],
  );
  const { usingKeyboard } = useUsingKeyboardContext();
  const { theme } = useDarkMode(darkMode);

  const checkboxId = useIdAllocator({ prefix: 'checkbox', id: idProp });
  const labelId = `${checkboxId}-label`;

  // If a prop is passed, use the prop
  // otherwise default bold if there's a description
  const bold = boldProp ?? !!description;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(e);
    }

    if (checkedProp == null) {
      setChecked(e.target.checked);
    }
  };

  const onClick = (
    e: React.MouseEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (onClickProp) {
      onClickProp(e);
    }

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (indeterminateProp) {
      onChange(e);
      e.stopPropagation();
    }
  };

  return (
    <div
      className={cx(
        containerStyle,
        {
          [disabledContainerStyle]: disabled,
        },
        className,
      )}
      style={style}
    >
      <Label
        id={labelId}
        htmlFor={checkboxId}
        darkMode={darkMode}
        disabled={disabled}
        className={cx(labelStyle, labelHoverStyle[theme], {
          [disabledLabelDarkThemeOverrideStyle]: disabled && darkMode,
        })}
      >
        <input
          {...rest}
          id={checkboxId}
          className={cx(inputClassName, inputStyle, {
            [inputFocusStyles[theme]]: usingKeyboard,
          })}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={isChecked}
          aria-label="checkbox"
          aria-disabled={disabled}
          aria-checked={indeterminateProp ? 'mixed' : isChecked}
          aria-labelledby={labelId}
          onClick={onClick}
          onChange={onChange}
        />

        <Check
          theme={theme}
          isChecked={isChecked}
          indeterminate={indeterminateProp}
          disabled={disabled}
          animate={animate}
          selector={checkWrapperClassName}
        />

        {label && (
          <span
            className={cx(labelTextStyle, {
              [css`
                font-weight: 400;
              `]: !bold,
            })}
          >
            {label}
          </span>
        )}
      </Label>

      {description && (
        <Description
          className={cx(descriptionStyle, {
            [disabledLabelDarkThemeOverrideStyle]: disabled && darkMode,
          })}
          darkMode={darkMode}
          disabled={disabled}
        >
          {description}
        </Description>
      )}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  darkMode: PropTypes.bool,
  description: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animate: PropTypes.bool,
};

export default Checkbox;
