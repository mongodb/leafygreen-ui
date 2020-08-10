import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { RadioGroupProps } from './RadioGroup';
import { Variant, Size } from './types';

const styledDiv = createDataProp('styled-div');

const containerMargin = css`
  margin-top: 8px;
`;

const offsets = {
  [Size.Small]: css`
    margin-top: -2px;
  `,
  [Size.Default]: css`
    margin-top: 1px;
  `,
};

const labelVariantStyle = {
  [Variant.Default]: {
    base: css`
      color: ${uiColors.gray.dark2};
    `,

    disabled: css`
      color ${uiColors.gray.base};
    `,
  },

  [Variant.Light]: {
    base: css`
      color: ${uiColors.white};
    `,

    disabled: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const labelStyle = css`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  line-height: 20px;
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
      background-color: ${uiColors.gray.dark2};
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
      border-color: ${uiColors.gray.dark2};

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

  &:disabled:hover + ${styledDiv.selector}:before {
    border: none;
  }

  &:disabled + ${styledDiv.selector} {
    cursor: not-allowed;

    &:after {
      box-shadow: none;
    }
  }
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
  flex-shrink: 0;
  border-radius: 100%;
  margin-right: 8px;

  &:before {
    content: '';
    position: absolute;
    border-radius: 100%;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
  }

  &:after {
    content: '';
    box-shadow: inset 0 -1px 0 0 #f1f1f1, 0 1px 0 0 rgba(0, 0, 0, 0.08),
      0 1px 1px 0 rgba(6, 22, 33, 0.22);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      border-color 0.15s ease-in-out;
    background-color: white;
    border-radius: 100%;
    transform: scale(0);
  }
`;

const divHeight = {
  [Size.Small]: css`
    height: 14px;
    width: 14px;

    &:after {
      width: 4px;
      height: 4px;
    }
  `,
  [Size.Default]: css`
    height: 20px;
    width: 20px;

    &:after {
      width: 8px;
      height: 8px;
    }
  `,
};

type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> &
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
  disabled,
  id,
  name,
  checked = false,
  size = Size.Default,
  variant = Variant.Default,
  ...rest
}: RadioProps) {
  return (
    <div className={containerMargin}>
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
          onChange={onChange}
          value={value}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={cx(inputStyle, inputVariantStyle[variant], {
            [disabledChecked[variant]]: disabled && checked,
          })}
        />
        <div
          {...styledDiv.prop}
          className={cx(divStyle, divVariantStyle[variant], divHeight[size])}
        ></div>
        <div className={offsets[variant]}>{children}</div>
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
  variant: PropTypes.oneOf(['default', 'light']),
  size: PropTypes.oneOf(['small', 'default']),
  default: PropTypes.bool,
};

export default Radio;
