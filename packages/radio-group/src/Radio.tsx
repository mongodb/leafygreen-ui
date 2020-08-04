import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import Variant from './Variant';

// Disabled + Selected
// Sizes
// Functionality QA and bug addressing
// Check that tests are still passing

const styledDiv = createDataProp('styled-div');

const labelVariantStyle = {
  [Variant.Default]: {
    base: css`
      color: ${uiColors.gray.dark2};
    `,

    disabled: css`
      color ${uiColors.gray.base};
      pointer-events: none;
    `,
  },

  [Variant.Light]: {
    base: css`
      color: ${uiColors.white};
    `,

    disabled: css`
      color: ${uiColors.gray.light1};
      pointer-events: none;
    `,
  },
};

const labelStyle = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  height: 20px;
  margin-top: 8px;
`;

// Note colors are not in our palette
const inputVariantStyle = {
  [Variant.Default]: css`
    &:checked + ${styledDiv.selector} {
      background-color: #2798bd;
      border-color: #2798bd;

      &:after {
        transform: scale(1);
      }
    }

    &:hover + ${styledDiv.selector}:before {
      border: 3px solid rgba(184, 196, 194, 0.3);
    }

    &:focus + ${styledDiv.selector}:before {
      border: 3px solid #9dd0e7;
    }

    &:disabled + ${styledDiv.selector} {
      background-color: ${uiColors.gray.light2};
      border-color: ${uiColors.gray.light1};
    }
  `,

  [Variant.Light]: css`
    &:checked + ${styledDiv.selector} {
      background-color: #43b1e5;
      border-color: #43b1e5;

      &:after {
        transform: scale(1);
      }
    }

    &:hover + ${styledDiv.selector}:before {
      border: 3px solid rgba(255, 255, 255, 0.2);
    }

    &:focus + ${styledDiv.selector}:before {
      border: 3px solid ${uiColors.blue.base};
    }

    &:disabled&:not(checked) + ${styledDiv.selector} {
      background-color: rgba(255, 255, 255, 0.15);
      border-color: ${uiColors.gray.base};
    }

    &:disabled:checked + ${styledDiv.selector} {
      background-color: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.15);

      &:after {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1);
      }
    }
  `,
};

const inputStyle = css`
  height: 0;
  width: 0;
  opacity: 0;
`;

const divVariantStyle = {
  [Variant.Default]: css`
    border: 2px solid ${uiColors.gray.dark1};
    background-color: rgba(255, 255, 255, 0.31);
  `,

  [Variant.Light]: css`
    border: 2px solid ${uiColors.white};
    background-color: rgba(255, 255, 255, 0.2);
  `,
};

const divStyle = css`
  position: relative;
  transition: background-color 0.15s ease-in-out;
  background-color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border-radius: 100px;
  margin-right: 8px;

  &:before {
    content: '';
    position: absolute;
    border-radius: 100px;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
  }

  &:after {
    content: '';
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      border-color 0.15s ease-in-out;
    background-color: white;
    height: 8px;
    width: 8px;
    border-radius: 50px;
    transform: scale(0);
  }
`;

interface RadioProps extends React.ComponentPropsWithoutRef<'input'> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  variant?: Variant;

  /**
   * Boolean that determines if the Radio is disabled.
   */
  disabled?: boolean;

  /**
   * className supplied to Radio container.
   */
  className?: string;

  /**
   * Used to determine what Radio is checked.
   */
  value: string | number;

  /**
   * Id for Radio and respective label.
   */
  id?: string;

  /**
   * If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
   */
  default?: boolean;

  /**
   * Content that will appear inside of the Radio component's label.
   */
  children?: React.ReactNode;
}

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
 */
function Radio({
  children,
  className,
  onChange,
  value,
  checked,
  disabled,
  id,
  name,
  variant = Variant.Light,
  ...rest
}: RadioProps) {
  return (
    <label
      htmlFor={id}
      className={cx(
        labelStyle,
        labelVariantStyle[variant].base,
        { [labelVariantStyle[variant].disabled]: disabled },
        className,
      )}
    >
      <input
        {...rest}
        id={id}
        name={name}
        type="radio"
        className={cx(inputStyle, inputVariantStyle[variant])}
        onChange={onChange}
        value={value}
        aria-checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
      />
      <div
        className={cx(divStyle, divVariantStyle[variant])}
        {...styledDiv.prop}
      ></div>
      {children}
    </label>
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
  variant: PropTypes.oneOf(['default', 'light']),
  default: PropTypes.bool,
};

export default Radio;
