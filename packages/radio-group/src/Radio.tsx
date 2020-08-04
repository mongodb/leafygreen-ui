import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { RadioGroupProps } from './RadioGroup';
import Variant from './Variant';

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
  line-height: 20px;
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
      border-color: ${uiColors.gray.light1};
      background-color: ${uiColors.gray.light2};
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

    &:disabled + ${styledDiv.selector} {
      background-color: ${uiColors.gray.dark1};
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,
};

const disabledChecked = {
  [Variant.Default]: css`
    &:disabled + ${styledDiv.selector} {
      background-color: ${uiColors.gray.light1};
      border-color: ${uiColors.gray.light1};

      &:after {
        background-color: ${uiColors.gray.light2};
        transform: scale(1);
      }
    }
  `,

  [Variant.Light]: css`
    &:disabled + ${styledDiv.selector} {
      border-color: ${uiColors.gray.dark1};

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
    border-radius: 50px;
    transform: scale(0);
  }
`;

const getDivHeight = size => {
  const radioSize = size === 'small' ? 14 : 20;
  const innerSize = size === 'small' ? 4 : 8;

  return css`
    height: ${radioSize}px;
    width: ${radioSize}px;

    &:after {
      width: ${innerSize}px;
      height: ${innerSize}px;
    }
  `;
};

type RadioProps = React.ComponentPropsWithoutRef<'input'> &
  Pick<RadioGroupProps, 'variant' | 'size'> & {
    default?: boolean;
    id?: string | number;
  };

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
  onChange,
  value,
  checked,
  disabled,
  id,
  name,
  size,
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
        className={cx(inputStyle, inputVariantStyle[variant], {
          [disabledChecked[variant]]: disabled && checked,
        })}
        onChange={onChange}
        value={value}
        aria-checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
      />
      <div
        className={cx(divStyle, divVariantStyle[variant], getDivHeight(size))}
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
